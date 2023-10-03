import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, Image, useSx, Pressable } from "dripsy";
import DefaultLayout from "../layouts/default";
import { useLayout } from "../hooks/useLayout";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import HttpClient from "../httpClient";
import { fromNow } from "../datetime";
import { useLinkTo } from "@react-navigation/native";
import { STRAPI_ENDPOINT } from "../constants";

const Article = ({ width, item, columnGap }) => {
  const linkTo = useLinkTo();
  const onPress = () => {
    linkTo(`/tin-dai-hoi/${get(item, "attributes.slug", "")}`);
  };

  if (isEmpty(item)) return <View sx={{ width, pt: columnGap / 2 }} />;

  const articleUri = `${STRAPI_ENDPOINT}${get(
    item,
    "attributes.thumb.data.attributes.url",
    ""
  )}`;

  return (
    <Pressable
      sx={{
        width,
        pt: columnGap / 2,
        borderBottomWidth: [1, 0],
        borderBottomColor: ["#dedede", "white"],
        pb: "$3",
      }}
      onPress={onPress}
    >
      <Image
        source={articleUri}
        sx={{
          width: width,
          height: (width * 255) / 382,
          borderRadius: [8, 12],
        }}
      />
      <Text
        sx={{
          color: "$text",
          fontWeight: "500",
          mt: "$2",
          fontSize: [14, 16],
        }}
      >
        {get(item, "attributes.title", "")}
      </Text>
      <Text
        sx={{
          color: "$text",
          fontWeight: "300",
          mt: "$2",
          fontSize: 13,
          lineHeight: 18,
        }}
      >
        {get(item, "attributes.desc", "")}
      </Text>
      <Text sx={{ color: "$primary", mt: "$2", fontSize: 12 }}>
        {fromNow(get(item, "attributes.updatedAt", ""))}
      </Text>
    </Pressable>
  );
};

export default function News(props) {
  const { onLayout, width: containerWidth } = useLayout();
  const sx = useSx();
  const { columnCount, columnGap } = sx({
    columnCount: [1, 2, 3],
    columnGap: [24, 32],
  });

  const articlesWidth = containerWidth - columnCount * columnGap;

  const [articles, setArticles] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await HttpClient.get({
        method: "/news",
        params: {
          populate: ["thumb"],
          sort: ["updatedAt:desc"],
        },
      });
      setArticles(data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const data = useMemo(
    () =>
      articles.concat(
        Array(columnCount - ((articles?.length || 0) % columnCount)).fill({})
      ),
    [columnCount, articles]
  );

  return (
    <DefaultLayout
      onContainerLayout={onLayout}
      bg={"$white"}
      mt={"$3"}
      borderRadius={[8, 12]}
    >
      {containerWidth > 0 && (
        <View
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            mb: "$3",
          }}
        >
          {data.map((item, index) => (
            <Article
              key={index}
              item={item}
              columnCount={columnCount}
              columnGap={columnGap}
              index={index}
              width={articlesWidth / columnCount}
            />
          ))}
        </View>
      )}
    </DefaultLayout>
  );
}
