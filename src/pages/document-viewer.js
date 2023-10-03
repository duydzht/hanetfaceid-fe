import React, { useCallback, useState, useEffect } from "react";
import { View, Text } from "dripsy";
import { useWindowDimensions } from "react-native";
import DefaultLayout from "../layouts/default";
import { useLayout } from "../hooks/useLayout";
import HttpClient from "../httpClient";
import get from "lodash/get";

export default function DocumentViewer({
  route: { params: { slug = "" } = {} },
}) {
  const { height: windowHeight } = useWindowDimensions();
  const { onLayout, width: containerWidth } = useLayout();
  const [document, setDocument] = useState(null);

  const fetchDocument = useCallback(async () => {
    const { data } = await HttpClient.get({
      method: `/documents`,
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
      },
    });
    setDocument(data[0]);
  }, [slug]);

  useEffect(() => {
    fetchDocument();
  }, []);

  const documentLink = get(document, "attributes.link", "");

  return (
    <DefaultLayout
      onContainerLayout={onLayout}
      mt={"$3"}
      bg={"$white"}
      borderRadius={[8, 12]}
    >
      <View>
        <Text
          sx={{
            fontWeight: 400,
            fontSize: 16,
            color: "$primary",
            py: "$3",
            px: "$3",
            fontStyle: "italic",
          }}
        >
          {`Văn kiện Đại hội - ${get(document, "attributes.title", "")}`}
        </Text>
        {documentLink ? (
          <iframe
            style={{ width: containerWidth, height: windowHeight - 96 }}
            src={documentLink}
            seamless="seamless"
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
          />
        ) : null}
      </View>
    </DefaultLayout>
  );
}
