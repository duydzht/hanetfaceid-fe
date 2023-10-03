import React from "react";
import { Linking } from "react-native";
import DefaultLayout from "../layouts/default";
import { View, Pressable, Text, useSx } from "dripsy";
import AspectRatioImage from "../components/AspectRatioImage";
import { useLayout } from "../hooks/useLayout";
import { Feather } from "@expo/vector-icons";

const vrGuide = require("../../assets/vr_guide.png");

const VR_LINK =
  "https://www.artsteps.com/view/62c3f5ee3b419705d71c0d76/?currentUser";

export default function Vr({}) {
  const { onLayout, width: containerWidth } = useLayout();
  const sx = useSx();

  const { imageWidth } = sx({
    imageWidth: [containerWidth, containerWidth / 2],
  });
  return (
    <DefaultLayout onContainerLayout={onLayout} mt={"$3"}>
      <View sx={{ flexGrow: 1, flex: 1, alignItems: "center", pb: "$3" }}>
        <Pressable
          sx={{
            bg: "$primary",
            mb: "$3",
            borderRadius: [8, 12],
            flexDirection: "row",
            alignItems: "center",
            px: "$3",
          }}
          onPress={() => Linking.openURL(VR_LINK, "_blank")}
        >
          <Text
            sx={{
              py: "$3",
              pr: "$2",
              color: "$white",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            BẮT ĐẦU THAM QUAN
          </Text>
          <Feather name="arrow-right" size={24} color="white" />
        </Pressable>
        <AspectRatioImage uri={vrGuide} aspectWidth={imageWidth} />
      </View>
    </DefaultLayout>
  );
}
