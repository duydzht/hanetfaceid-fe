import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale, scaleFontVertical } from "../utils";
import Colors from "../colors";
import get from "lodash/get";
import { STRAPI_ENDPOINT } from "../constants";
import { formatTimestamp } from "../datetime";
import FaceImage from "./FaceImage";

const logoDaihoi = require("../../assets/logo_daihoi.png");

const Stranger = ({ time }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          paddingHorizontal: scale(12),
          paddingVertical: scale(4),
          color: "white",
          borderRadius: scale(8),
          backgroundColor: "red",
          fontWeight: "600",
          fontSize: scaleFontVertical(16),
        }}
      >
        {"Khách mời"}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: scale(12),
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: scaleFontVertical(14), fontWeight: 600 }}>
          Xuất hiện
        </Text>
        <Text
          style={{
            fontSize: scaleFontVertical(16),
            marginLeft: 12,
            fontWeight: 900,
          }}
        >
          {formatTimestamp(time)}
        </Text>
      </View>
    </View>
  );
};

export const Person = ({ checkinData }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text numberOfLines={1} style={[styles.name, { fontSize: 20 }]}>
        {get(checkinData, "face.name", __DEV__ ? "Nguyễn Anh Tuấn" : "")}
      </Text>
      <Text
        numberOfLines={2}
        style={[
          styles.title,
          { fontSize: 18, color: Colors.secondaryTextColor },
        ]}
      >
        {get(
          checkinData,
          "face.title",
          __DEV__
            ? "Bí Thư Đoàn Xã An Khánh Bí Thư Đoàn Xã An Khánh Bí Thư Đoàn Xã An Khánh"
            : ""
        )}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: scale(12),
        }}
      >
        <Text
          style={{
            fontSize: scaleFontVertical(14),
            backgroundColor: "#6ED69E",
            paddingHorizontal: scale(12),
            paddingVertical: scale(4),
            color: "white",
            borderRadius: scale(8),
            fontWeight: 600,
          }}
        >
          Xuất hiện
        </Text>
        <Text
          style={{
            fontSize: scaleFontVertical(16),
            marginLeft: 12,
            color: Colors.primaryColor,
            fontWeight: 900,
          }}
        >
          {formatTimestamp(checkinData?.time)}
        </Text>
      </View>
    </View>
  );
};

export default function FaceRecognition({ width, checkinData }) {
  const isStranger = checkinData && !checkinData?.face;
  const IMAGE_SIZE = width / 2.5;
  return (
    <View style={styles.info}>
      <FaceImage
        imageSize={IMAGE_SIZE}
        source={
          isStranger
            ? logoDaihoi
            : {
                uri: `${STRAPI_ENDPOINT}${get(
                  checkinData,
                  "face.avatar.url",
                  ""
                )}`,
              }
        }
        style={{ alignSelf: "center" }}
      />
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          paddingLeft: 12,
          paddingVertical: 12,
          width: "100%",
        }}
      >
        {isStranger ? (
          <Stranger time={checkinData?.time} />
        ) : checkinData?.face ? (
          <Person checkinData={checkinData} />
        ) : (
          <View style={styles.skeleton}>
            <View style={styles.line} />
            <View style={[styles.line, { width: "80%" }]} />
            <View style={[styles.line, { width: "60%" }]} />
          </View>
        )}
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  info: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(24),
    flexGrow: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 12,
  },
  item: {
    flexDirection: "row",
    marginTop: 12,
  },
  itemInfo: {
    flexGrow: 1,
    flex: 1,
    paddingLeft: 8,
    justifyContent: "center",
  },
  name: {
    fontSize: scaleFontVertical(14),
    fontWeight: 600,
    color: Colors.primaryTextColor,
  },
  type: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: 600,
    color: Colors.primaryTextColor,
  },
  title: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: 600,
    color: Colors.primaryTextColor,
    textAlign: "center",
  },
  time: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 300,
    color: Colors.primaryTextColor,
  },
  skeleton: {
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    backgroundColor: "#F5F5F6",
    height: 20,
    width: "70%",
    borderRadius: 8,
    marginTop: 8,
  },
});
