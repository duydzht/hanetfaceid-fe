import React, { useEffect, useState, useRef, useCallback } from "react";
import { InteractionManager } from "react-native";
import { View, Text, Pressable, ScrollView } from "dripsy";
import DefaultLayout from "../layouts/default";
import SeatMap from "../components/SeatMap";
import { useLayout } from "../hooks/useLayout";

import { SESSION_1_AND_3, SESSION_2, SESSION_TD } from "../data/seat-maps";

const DATA = [SESSION_1_AND_3, SESSION_2, SESSION_TD];

export default function SeatMaps() {
  const [selected, setSelected] = useState(0);
  const { onLayout, width: containerWidth } = useLayout();

  const scrollViewWidth = useRef(0);
  const scrollViewContentWidth = useRef(0);
  const scrollViewRef = useRef(null);

  const onScrollViewLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }) => {
      scrollViewWidth.current = width;
    },
    []
  );

  const onScrollViewContentLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }) => {
      scrollViewContentWidth.current = width;
    },
    []
  );

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: (scrollViewContentWidth.current - scrollViewWidth.current) / 2,
        });
      }, 500);
    });

    return () => interactionPromise.cancel();
  }, [selected]);

  const data = DATA[selected];

  return (
    <DefaultLayout onContainerLayout={onLayout} useFullScreen={true}>
      <View sx={{ py: "$3" }}>
        <View
          sx={{
            flexDirection: "row",
            height: 40,
            borderWidth: 1,
            borderColor: "$primary",
            borderRadius: 4,
            alignSelf: "center",
          }}
        >
          <Pressable
            onPress={() => setSelected(0)}
            sx={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              ...(selected === 0 && {
                bg: "$primary",
              }),
              minWidth: 120,
            }}
          >
            <Text
              sx={{
                color: "$text",
                fontSize: 13,
                fontWeight: "600",
                ...(selected === 0 && {
                  color: "$white",
                }),
                textAlign: "center",
              }}
            >
              {`PHIÊN 1 và 3`}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSelected(1)}
            sx={{
              height: "100%",
              borderLeftWidth: 1,
              borderLeftColor: "$primary",
              justifyContent: "center",
              alignItems: "center",
              ...(selected === 1 && {
                bg: "$primary",
              }),
              minWidth: 100,
            }}
          >
            <Text
              sx={{
                color: "$text",
                fontSize: 13,
                fontWeight: "600",
                ...(selected === 1 && {
                  color: "$white",
                }),
                textAlign: "center",
              }}
            >
              PHIÊN 2
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSelected(2)}
            sx={{
              height: "100%",
              borderLeftWidth: 1,
              borderLeftColor: "$primary",
              justifyContent: "center",
              alignItems: "center",
              ...(selected === 2 && {
                bg: "$primary",
              }),
              minWidth: 120,
            }}
          >
            <Text
              sx={{
                color: "$text",
                fontSize: 13,
                fontWeight: "600",
                ...(selected === 2 && {
                  color: "$white",
                }),
                textAlign: "center",
              }}
            >
              {"PHIÊN \nTUYÊN DƯƠNG"}
            </Text>
          </Pressable>
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          onLayout={onScrollViewLayout}
          sx={{
            mt: "$3",
            width: containerWidth,
          }}
        >
          <SeatMap
            width={containerWidth}
            data={data}
            onLayout={onScrollViewContentLayout}
          />
        </ScrollView>
      </View>
    </DefaultLayout>
  );
}
