import React, { useMemo } from "react";
import { Text, View, Image, Pressable } from "dripsy";
import { Entypo } from "@expo/vector-icons";
import { useLayout } from "../hooks/useLayout";
import { useRoute, useLinkBuilder, useLinkTo } from "@react-navigation/native";
import { useScale } from "../hooks/useScale";
import isUndefine from "lodash/isUndefined";

import { linking } from "../linking";
import Container from "./Container";

const {
  config: { screens },
} = linking;

const logo = require("../../assets/logo_daihoi.png");

export const HEADER_HEIGHT = 80;
const LOGO_HEIGHT = 70;

export const MENUS = {
  home: {
    name: "TRANG CHỦ",
    path: screens.Home,
  },
  news: {
    name: "TIN ĐẠI HỘI",
    path: screens.News,
  },
  profiles: {
    name: "HỒ SƠ ĐẠI BIỂU",
    path: screens.Profiles,
  },
  programs: {
    name: "CHƯƠNG TRÌNH",
    path: screens.Programs,
  },
  seatMaps: {
    name: "SƠ ĐỒ CHỖ NGỒI",
    path: screens.SeatMaps,
  },
  documents: {
    name: "VĂN KIỆN ĐẠI HỘI",
    path: screens.Documents,
  },
};

const WebHeaderContent = React.memo(
  ({ openMenu = () => {}, onContentLayout, showFullMenu }) => {
    const linkTo = useLinkTo();
    const route = useRoute();
    const buildLink = useLinkBuilder();
    const linking = buildLink(route.name, route.params);

    const marginLeftOfItem = useScale(40);

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={logo}
            style={{ height: LOGO_HEIGHT, width: (LOGO_HEIGHT * 300) / 189 }}
            resizeMode={"contain"}
          />

          <View
            style={{ flexGrow: 1, flex: 1, height: HEADER_HEIGHT }}
            onLayout={onContentLayout}
          >
            {!isUndefine(showFullMenu) && showFullMenu && (
              <View
                style={{
                  height: "100%",
                  flexDirection: "row",
                }}
              >
                {Object.values(MENUS).map(({ name, path }, index) => {
                  const isActive = linking.startsWith(path);
                  return (
                    <Pressable
                      onPress={() => linkTo(path)}
                      key={index}
                      sx={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        ml: marginLeftOfItem,
                        ...(isActive && {
                          borderBottomColor: "$primary",
                          borderBottomWidth: 2,
                        }),
                      }}
                    >
                      <Text
                        sx={{
                          color: "$black",
                          fontWeight: "400",
                          fontSize: 16,
                          ...(isActive && {
                            fontWeight: "700",
                            color: "$primary",
                          }),
                        }}
                      >
                        {name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
          {!isUndefine(showFullMenu) && !showFullMenu && (
            <Pressable
              onPress={openMenu}
              style={{
                height: HEADER_HEIGHT,
                width: HEADER_HEIGHT,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="menu" size={HEADER_HEIGHT / 1.5} color="#0072B1" />
            </Pressable>
          )}
        </View>
      </View>
    );
  }
);

export default function WebHeader({ openMenu, onContentLayout, showFullMenu }) {
  return (
    <View sx={{ bg: "$white" }}>
      <Container>
        <WebHeaderContent
          openMenu={openMenu}
          onContentLayout={onContentLayout}
          showFullMenu={showFullMenu}
        />
      </Container>
    </View>
  );
}
