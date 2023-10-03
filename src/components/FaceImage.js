import React from "react";
import { View, Image } from "react-native";
import { scale } from "../utils";

export default function FaceImage({ imageSize, source, style }) {
  return (
    <View
      style={[
        {
          width: imageSize,
          height: imageSize,
          backgroundColor: "#F5F5F6",
          borderRadius: scale(8),
        },
        style,
      ]}
    >
      <Image
        resizeMode="contain"
        source={source}
        style={{ width: "100%", height: "100%", borderRadius: scale(8) }}
      />
    </View>
  );
}
