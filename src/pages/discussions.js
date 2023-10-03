import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, useSx, Pressable, ScrollView } from "dripsy";
import DefaultLayout from "../layouts/default";
import { useLayout } from "../hooks/useLayout";
import HttpClient from "../httpClient";
import { useLinkTo } from "@react-navigation/native";
import orderBy from "lodash/orderBy";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import AspectRatioImage from "../components/AspectRatioImage";
import { STRAPI_ENDPOINT } from "../constants";

const Type = {
  ALL: "ALL",
  THAMDINH: "THAMDINH",
  SBN: "SBN",
};

const TABS = [
  {
    title: "Tham luận đã thẩm định",
    type: Type.THAMDINH,
  },
  {
    title: "Tham luận của các sở ban ngành",
    type: Type.SBN,
  },
];

const TabItem = ({ title, ml, active, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      sx={{
        height: "100%",
        px: "$3",
        justifyContent: "center",
        ml,
      }}
    >
      <Text
        sx={{
          color: "$text",
          fontSize: 16,
          fontWeight: 600,
          ...(active && { color: "$primary" }),
        }}
      >
        {title}
      </Text>
      {active && (
        <View
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            width: "100%",
            bg: "$primary",
          }}
        />
      )}
    </Pressable>
  );
};

const Tabs = ({ selectedType, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        sx={{
          flexDirection: "row",
          height: 48,
          borderBottomWidth: 1,
          borderBottomColor: "#F5F5F5",
        }}
      >
        {TABS.map((item, index) => (
          <TabItem
            {...(index > 0 && {
              ml: "$3",
              borderLeftWidth: 1,
              borderLeftColor: "#F5F5F5",
            })}
            key={index}
            onPress={() => onSelect(item.type)}
            active={selectedType === item.type}
            title={item.title}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const DocumentItem = ({ item, onItemPress, width }) => {
  const onPress = useCallback(() => {
    onItemPress && onItemPress(item);
  }, [item]);

  const thumbUri = `${STRAPI_ENDPOINT}${get(
    item,
    "attributes.thumb.data.attributes.url",
    ""
  )}`;

  if (isEmpty(item)) {
    return <View sx={{ width, mt: "$3" }} />;
  }

  return (
    <Pressable
      onPress={onPress}
      sx={{
        width,
        mt: "$3",
      }}
    >
      <AspectRatioImage uri={thumbUri} aspectWidth={width} />
      <Text
        sx={{
          fontWeight: 500,
          fontSize: 12,
          color: "white",
          backgroundColor: "rgba(21, 21, 21, 0.85)",
          py: "$2",
          px: "$2",
          flex: 1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        {item?.attributes?.title}
      </Text>
    </Pressable>
  );
};

export default function Discussions(props) {
  const { onLayout, width: containerWidth } = useLayout();
  const [documents, setDocuments] = useState(null);
  const [selectedType, setSelectedType] = useState(Type.ALL);
  const sx = useSx();
  const { columnCount, columnGap } = sx({
    columnCount: [2, 3, 4, 6],
    columnGap: [32, 24],
  });

  const fetchData = useCallback(async () => {
    try {
      const { data } = await HttpClient.get({
        method: "/discussions",
        params: {
          populate: ["thumb"],
        },
      });
      setDocuments({
        all: data.filter(({ attributes: { type } }) => type === Type.ALL),
      });
    } catch (error) {
      console.log("Discussions.error", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const data = useMemo(() => {
    const docs = orderBy(documents?.all || [], (item) => item?.attributes?.no, [
      "asc",
    ]);
    return docs.concat(
      Array(columnCount - ((docs?.length || 0) % columnCount)).fill({})
    );
  }, [selectedType, documents]);

  const linkTo = useLinkTo();

  const onItemPress = useCallback(({ attributes: { slug } }) => {
    linkTo(`/tham-luan/${slug}`);
  }, []);

  const itemWidth = (containerWidth - columnCount * columnGap) / columnCount;

  return (
    <DefaultLayout
      onContainerLayout={onLayout}
      mt={"$3"}
      bg={"$white"}
      borderRadius={[8, 12]}
    >
      {data ? (
        <View
          sx={{
            borderWidth: 1,
            borderColor: "#F5F5F5",
            borderRadius: [8, 12],
          }}
        >
          {/* <Tabs
            selectedType={selectedType}
            onSelect={(type) => setSelectedType(type)}
          /> */}
          {containerWidth ? (
            <View
              sx={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                pb: "$3",
              }}
            >
              {data?.map((item, index) => (
                <DocumentItem
                  key={index}
                  index={index}
                  item={item}
                  onItemPress={onItemPress}
                  width={itemWidth}
                  columnCount={columnCount}
                />
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
    </DefaultLayout>
  );
}
