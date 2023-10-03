import React, { useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { get } from "lodash";
import { STRAPI_ENDPOINT } from "./constants";
import { scale, scaleFont } from "./utils";
import Colors from "./colors";
import { formatDate } from "./datetime";

let styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    borderRadius: scale(8),
    justifyContent: "space-between",
  },
  info: {
    flexGrow: 1,
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    justifyContent: "space-between",
    flex: 1,
  },
  name: {
    fontSize: scaleFont(16),
    fontWeight: 600,
    color: Colors.primaryTextColor,
  },
  title: {
    fontSize: scaleFont(14),
    fontWeight: 400,
    marginTop: 6,
    color: Colors.primaryTextColor,
  },
});

const DelegateItem = ({ index, width, data, numColumns, columnGap }) => {
  const marginRight = index % numColumns < numColumns - 1 ? columnGap : 0;
  const marginTop = index <= numColumns - 1 ? 0 : columnGap;

  const thumbUri = `${STRAPI_ENDPOINT}${get(
    data,
    "attributes.avatar.data.attributes.formats.thumbnail.url",
    ""
  )}`;

  const AVATAR_WIDTH = useMemo(() => width / 3, [width]);
  const firstCheckin = data?.firstCheckin;

  return (
    <View style={[styles.item, { width, marginRight, marginTop }]}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: AVATAR_WIDTH,
            height: AVATAR_WIDTH / 0.75,
          }}
        >
          <Image
            source={{
              uri: thumbUri,
            }}
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: scale(8),
            }}
          />
        </View>
        <View style={styles.info}>
          <View style={{ flexGrow: 1, flex: 1 }}>
            <Text style={styles.name} numberOfLines={2}>
              {get(data, "attributes.name")}
            </Text>
            <Text style={styles.title} numberOfLines={3}>
              {get(data, "attributes.title")}
            </Text>
          </View>
        </View>
      </View>
      {firstCheckin ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: scale(4),
            paddingVertical: scale(4),
          }}
        >
          <Text
            style={{
              backgroundColor: "#6ED69E",
              paddingHorizontal: scale(12),
              paddingVertical: scale(4),
              color: "white",
              borderRadius: scale(8),
              fontWeight: 600,
              fontSize: scaleFont(14),
            }}
          >
            Xuất hiện
          </Text>
          <Text
            style={{
              color: Colors.primaryColor,
              fontSize: scaleFont(14),
              fontWeight: 900,
            }}
          >{`${formatDate(firstCheckin)}`}</Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: scale(4),
            paddingHorizontal: scale(4),
          }}
        >
          <Text
            style={{
              paddingHorizontal: scale(8),
              paddingVertical: scale(4),
              color: "white",
              borderRadius: scale(8),
              backgroundColor: "#FFC700",
              fontWeight: 600,
              fontSize: scaleFont(14),
            }}
          >
            Chưa xuất hiện
          </Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(DelegateItem);
