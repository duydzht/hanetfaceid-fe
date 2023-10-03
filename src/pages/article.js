import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "dripsy";
import DefaultLayout from "../layouts/default";
import get from "lodash/get";
import HttpClient from "../httpClient";
import { STRAPI_ENDPOINT } from "../constants";
import { fromNow } from "../datetime";
import { useLayout } from "../hooks/useLayout";
import HTMLView from "react-native-htmlview";
import AspectRatioImage from "../components/AspectRatioImage";

export default function Article({ route: { params: { slug = "" } = {} } }) {
  const [data, setData] = useState(null);
  const fetchData = useCallback(async () => {
    if (!slug) {
      return;
    }
    try {
      const { data } = await HttpClient.get({
        method: "/news",
        params: {
          filters: {
            slug: {
              $eq: slug,
            },
          },
        },
      });
      console.log("Article.fetchData.data", data);
      setData(data[0]);
    } catch (error) {}
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, []);

  const content = get(data, "attributes.content", "").replace(
    /\/uploads/g,
    `${STRAPI_ENDPOINT}/uploads`
  );

  const { onLayout, width: containerWidth } = useLayout();

  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == "img") {
      console.log("node.attribs.src", node.attribs.src);
      return (
        <View
          sx={{
            width: containerWidth - 48,
            justifyContent: "center",
            alignItems: "center",
            pb: "$3",
          }}
        >
          <AspectRatioImage
            uri={node.attribs.src}
            aspectWidth={containerWidth - 48}
          />
        </View>
      );
    }
  };

  return (
    <DefaultLayout
      borderRadius={[8, 12]}
      bg={"$white"}
      mt={"$3"}
      onContainerLayout={onLayout}
    >
      <Text
        sx={{
          color: "$text",
          fontWeight: "500",
          mt: "$4",
          fontSize: [18, 22],
          px: 24,
        }}
      >
        {get(data, "attributes.title", "")}
      </Text>
      <Text sx={{ color: "$primary", mt: "$2", fontSize: 12, px: 24 }}>
        {fromNow(get(data, "attributes.createdAt", ""))}
      </Text>
      <View sx={{ width: containerWidth - 48, alignSelf: "center", mt: "$3" }}>
        <HTMLView value={content} renderNode={renderNode} />
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  a: {
    fontWeight: "300",
    textDecorationLine: "underline",
  },
  img: {
    alignSelf: "center",
  },
});
