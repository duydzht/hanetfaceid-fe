import React, { useCallback } from "react";
import { View, Text, Image, useSx, Pressable } from "dripsy";
import DefaultLayout from "../layouts/default";
import Carousel from "react-native-reanimated-carousel";
import { useLayout } from "../hooks/useLayout";
import { useScale } from "../hooks/useScale";
import { useLinkTo } from "@react-navigation/native";

const banner = require("../../assets/banner.jpeg");
const newsIcon = require("../../assets/news.png");
const profileIcon = require("../../assets/profile.png");
const programIcon = require("../../assets/program.png");
const mapIcon = require("../../assets/map.png");
const documentIcon = require("../../assets/document.png");
const vrIcon = require("../../assets/vr.png");

import { MENUS } from "../components/WebHeader";

const CATEGORIES = [
  {
    name: MENUS.news.name,
    icon: newsIcon,
    path: MENUS.news.path,
  },
  {
    name: MENUS.profiles.name,
    icon: profileIcon,
    path: MENUS.profiles.path,
  },
  {
    name: MENUS.programs.name,
    icon: programIcon,
    path: MENUS.programs.path,
  },
  {
    name: MENUS.seatMaps.name,
    icon: mapIcon,
    path: MENUS.seatMaps.path,
  },
  {
    name: MENUS.documents.name,
    icon: documentIcon,
    path: MENUS.documents.path,
  },
  {
    name: "TRIỂN LÃM THỰC TẾ ẢO",
    icon: vrIcon,
    path: "/trien-lam-thuc-te-ao",
  },
];

const CarouselItem = React.memo(({ width, height }) => {
  return (
    <Image
      source={banner}
      sx={{ width, height, borderRadius: [0, useScale(12)] }}
    />
  );
});

const CategoryItem = React.memo(
  ({ name, icon, path, width, columnCount, columnGap }) => {
    const linkTo = useLinkTo();
    const onPress = useCallback(() => linkTo(path), [path]);
    return (
      <Pressable
        onPress={onPress}
        sx={{
          width: width / columnCount,
          height: width / columnCount,
          bg: "$white",
          alignItems: "center",
          borderRadius: 12,
          mb: columnGap,
          justifyContent: "center",
          boxShadow: `0px 8px 18px rgba(0, 114, 177, 0.25)`,
        }}
      >
        <Image
          source={icon}
          sx={{
            width: width / (3 * columnCount),
            height: width / (3 * columnCount),
          }}
        />
        <Text
          sx={{
            color: "$primary",
            textAlign: "center",
            mt: "$3",
            fontSize: [14, 15, 16, 17],
            fontWeight: 600,
          }}
        >
          {name}
        </Text>
      </Pressable>
    );
  }
);
export default function Home() {
  const { onLayout: onContainerLayout, width: containerWidth } = useLayout();
  const width = containerWidth;
  const height = (containerWidth * 1522) / 4000;

  const sx = useSx();

  const { columnCount, columnGap } = sx({
    columnCount: [2, 3, 4, 5, 6],
    columnGap: [useScale(80), useScale(48)],
  });

  const categoryWidth = width - columnCount * columnGap;

  return (
    <DefaultLayout onContainerLayout={onContainerLayout} mt={"$3"}>
      {containerWidth > 0 && (
        <Carousel
          width={width}
          height={height}
          data={[1]}
          renderItem={({ item }) => (
            <CarouselItem width={width} height={height} />
          )}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: columnGap,
        }}
      >
        {CATEGORIES.map(({ name, icon, path }, index) => {
          return (
            <CategoryItem
              key={index}
              name={name}
              icon={icon}
              path={path}
              columnCount={columnCount}
              columnGap={columnGap}
              width={categoryWidth}
            />
          );
        })}
      </View>
    </DefaultLayout>
  );
}
