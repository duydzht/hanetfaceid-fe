import React, { useEffect } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import DelegateList from "./DelegateList";
import Sidebar from "./Sidebar";
import { useLayout } from "./hooks/useLayout";
import Colors from "./colors";
import { scale } from "./utils";
import Header, { HEADER_HEIGHT } from "./components/Header";
import { socket } from "./webSocket";

let styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    overflowY: "hidden",
  },
  content: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "#F7F7F9",
  },
  main: {},
  sidebar: {
    marginBottom: scale(24),
  },
});

export default function Container(props) {
  const { width, height } = useWindowDimensions();
  const { onLayout: onMainLayout, width: mainWidth } = useLayout();

  const CONTENT_HEIGHT = height - HEADER_HEIGHT;
  const CONTENT_WIDTH = width - scale(42);
  const SIDEBAR_WIDTH = CONTENT_WIDTH / 3;
  const MAIN_WIDTH = CONTENT_WIDTH - SIDEBAR_WIDTH - scale(18);

  useEffect(() => {
    socket.on("hello", (data) => {
      console.log("socket.said: ", data);
    });
  }, []);

  const containerStyle = {
    flex: 1,
    width,
    height,
  };

  const contentStyle = {
    width: width,
    height: CONTENT_HEIGHT,
    flexDirection: "row",
    backgroundColor: Colors.background,
    paddingTop: scale(24),
    paddingHorizontal: scale(24),
    justifyContent: "space-between",
  };

  const mainStyle = {
    width: MAIN_WIDTH,
    height: CONTENT_HEIGHT,
  };

  return (
    <View style={containerStyle}>
      <Header />
      <View style={contentStyle}>
        <View style={mainStyle} onLayout={onMainLayout}>
          <DelegateList width={mainWidth} height={CONTENT_HEIGHT} />
        </View>
        <View style={[styles.sidebar, { width: SIDEBAR_WIDTH }]}>
          <Sidebar height={CONTENT_HEIGHT} width={SIDEBAR_WIDTH} />
        </View>
      </View>
    </View>
  );
}
