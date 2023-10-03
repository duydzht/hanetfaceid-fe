import React from "react";
import { Text, View, Image, Pressable } from "dripsy";
import { Entypo } from "@expo/vector-icons";
import { useRoute, useLinkBuilder, useLinkTo } from "@react-navigation/native";
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
    path: screens.SeatMapsTQ,
  },
  documents: {
    name: "VĂN KIỆN ĐẠI HỘI",
    path: screens.Documents,
  },
  discussions: {
    name: "THAM LUẬN",
    path: screens.Discussions,
  },
};

const WebHeaderContent = React.memo(
  ({ openMenu = () => {}, onContentLayout, showFullMenu }) => {
    const linkTo = useLinkTo();
    const route = useRoute();
    const buildLink = useLinkBuilder();
    const linking = buildLink(route.name, route.params);

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
            style={{ height: LOGO_HEIGHT, width: (LOGO_HEIGHT * 400) / 240 }}
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
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", flex: 1, flexGrow: 1 }}>
                  {Object.values(MENUS).map(({ name, path }, index) => {
                    const isActive = linking.startsWith(path);
                    return (
                      <Pressable
                        onPress={() => linkTo(path)}
                        key={index}
                        sx={{
                          height: "100%",
                          justifyContent: "center",
                          paddingHorizontal: 7,
                          alignItems: "center",
                          ...(isActive && {
                            borderBottomColor: "$primary",
                            borderBottomWidth: 2,
                          }),
                        }}
                      >
                        <Text
                          sx={{
                            color: "$black",
                            fontWeight: "600",
                            textAlign: "center",
                            fontSize: 13,
                            ...(isActive && {
                              fontWeight: "600",
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
                <Pressable
                  sx={{
                    alignSelf: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    height: 44,
                    px: "$4",
                    bg: "$primary",
                    borderRadius: 12,
                    boxShadow: `1px 1px 4px rgba(0, 114, 177, 0.25)`,
                  }}
                  onPress={() => linkTo("/checkin-online")}
                >
                  <Text
                    sx={{
                      color: "$white",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    ĐIỂM DANH
                  </Text>
                </Pressable>
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
