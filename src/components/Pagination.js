import React from "react";
import { View, Text, Pressable } from "dripsy";
import { Entypo } from "@expo/vector-icons";

export default function Pagination({
  pagination: { page, pageCount } = {},
  onPrevious,
  onNext,
}) {
  return (
    <View
      sx={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "$primary",
        alignSelf: "center",
        my: "$3",
      }}
    >
      <Pressable
        onPress={onPrevious}
        sx={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRightWidth: 1,
          borderRightColor: "$primary",
        }}
      >
        <Entypo name="chevron-left" size={24} color="#0072B1" />
      </Pressable>
      <Text
        sx={{
          color: "$primary",
          fontSize: [14, 16],
          fontWeight: "600",
          px: "$3",
        }}
      >{`${page} / ${pageCount}`}</Text>
      <Pressable
        onPress={onNext}
        sx={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderLeftWidth: 1,
          borderLeftColor: "$primary",
        }}
      >
        <Entypo name="chevron-right" size={24} color="#0072B1" />
      </Pressable>
    </View>
  );
}
