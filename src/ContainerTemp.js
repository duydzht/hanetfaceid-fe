import React, { useEffect, useState } from "react";
import { View, StyleSheet, useWindowDimensions, Text } from "react-native";
import DelegateList from "./DelegateList";
import Sidebar from "./Sidebar";
import { useLayout } from "./hooks/useLayout";
import Colors from "./colors";
import { scale, scaleFont } from "./utils";
import Header, { HEADER_HEIGHT } from "./components/Header";
import dayjs from "dayjs";

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
  time: {
    fontSize: scaleFont(80),
  },
});

export default function Container(props) {
  const { width, height } = useWindowDimensions();
  const { onLayout: onMainLayout, width: mainWidth } = useLayout();

  const CONTENT_HEIGHT = height - HEADER_HEIGHT;
  const CONTENT_WIDTH = width - scale(42);
  const SIDEBAR_WIDTH = CONTENT_WIDTH / 2;
  const MAIN_WIDTH = CONTENT_WIDTH - SIDEBAR_WIDTH - scale(18);

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
    flex: 1,
  };

  const mainStyle = {
    // width: MAIN_WIDTH,
    // height: CONTENT_HEIGHT,
    flex: 1,
  };

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={containerStyle}>
      <Header />
      <View style={contentStyle}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.time}>{dayjs(time).format("HH:mm:ss")}</Text>
        </View>
        <View
          style={[
            styles.sidebar,
            {
              width: SIDEBAR_WIDTH,
              height: CONTENT_HEIGHT,
              flex: 2,
              marginHorizontal: scale(20),
            },
          ]}
        >
          <Sidebar height={CONTENT_HEIGHT} width={SIDEBAR_WIDTH} />
        </View>
        <View style={mainStyle} onLayout={onMainLayout}>
          <DelegateList
            width={mainWidth}
            height={CONTENT_HEIGHT}
            numColumns={1}
          />
        </View>
      </View>
    </View>
  );
}
