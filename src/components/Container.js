import React from "react";
import { View } from "dripsy";
export default function Container({
  children,
  onLayout,
  bg,
  mt,
  borderRadius,
  useFullScreen,
}) {
  return (
    <View
      onLayout={onLayout}
      sx={{
        flexGrow: 1,
        width: useFullScreen ? "100%" : ["100%", "66%"],
        alignSelf: "center",
        bg,
        mt,
        borderRadius,
      }}
    >
      {children}
    </View>
  );
}
