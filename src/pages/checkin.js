import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { View, Text, Image } from "dripsy";
import AspectRatioImage from "../components/AspectRatioImage";
import { StoreContext } from "../store";
import get from "lodash/get";
import { STRAPI_ENDPOINT } from "../constants";
import { socket, CHECKIN_EVENT } from "../webSocket";
import { ADD_CHECKIN } from "../store/action";

const { width, height } = Dimensions.get("screen");

const SCREEN_HEIGHT = height;

const MAX_IMAGE_HEIGHT = SCREEN_HEIGHT / 3;

const logoImg = require("../../assets/logo_daihoi.png");
const bgBottomLeft = require("../../assets/bg_bottom_left.png");
const bgTopRight = require("../../assets/bg_top_right.png");

export default function Checkin() {
  const [
    {
      checkin: { current: checkinData },
    },
    dispatch,
  ] = useContext(StoreContext);

  useEffect(() => {
    socket.on(CHECKIN_EVENT, ({ data }) => {
      console.log(CHECKIN_EVENT, JSON.stringify(data));
      dispatch({
        type: ADD_CHECKIN,
        payload: data,
      });
    });
  }, [dispatch]);

  console.log("Checkin.checkinData", checkinData);

  const avatarUri = `${STRAPI_ENDPOINT}${get(
    checkinData,
    "face.avatar.url",
    ""
  )}`;

  const name = get(checkinData, "face.name", "")?.toUpperCase();

  const title = get(checkinData, "face.title", "")?.toUpperCase();

  return (
    <View sx={{ height: SCREEN_HEIGHT, bg: "#F0FBFF" }}>
      <Image
        source={bgBottomLeft}
        style={{ position: "absolute", left: 0, bottom: 0, height, width }}
      />
      <Image
        source={bgTopRight}
        style={{ position: "absolute", top: 0, right: 0, height, width }}
      />
      <View sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          sx={{
            color: "#E01419",
            fontSize: 80,
            fontFamily: "AlfaSlabOne_400Regular",
          }}
        >
          CHÀO MỪNG
        </Text>
      </View>
      <View sx={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <View sx={{ flex: 1, alignItems: "flex-end" }}>
          <Image
            source={logoImg}
            style={{
              width: (240 * MAX_IMAGE_HEIGHT) / 400,
              height: MAX_IMAGE_HEIGHT,
              boxShadow: `0px 8px 18px rgba(0, 114, 177, 0.25)`,
            }}
          />
        </View>
        <View
          sx={{
            flex: 1.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            sx={{
              color: "#015E35",
              fontSize: 60,
              fontWeight: 200,
              fontFamily: "AlfaSlabOne_400Regular",
            }}
          >
            ĐẠI BIỂU
          </Text>
          <Text
            sx={{
              color: "#07529D",
              fontSize: 40,
              mt: "$5",
              fontFamily: "AlfaSlabOne_400Regular",
            }}
          >
            {name}
          </Text>
          <Text
            sx={{
              color: "#07529D",
              fontSize: 32,
              mt: "$3",
              fontFamily: "AlfaSlabOne_400Regular",
              textAlign: "center",
            }}
          >
            {title}
          </Text>
        </View>
        <View sx={{ flex: 1 }}>
          <AspectRatioImage
            uri={avatarUri}
            aspectHeight={MAX_IMAGE_HEIGHT}
            style={{
              boxShadow: `0px 8px 18px rgba(0, 114, 177, 0.25)`,
            }}
          />
        </View>
      </View>
      <View sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          sx={{
            textAlign: "center",
            color: "#07529D",
            fontSize: 32,
            fontWeight: 400,
            fontFamily: "AlfaSlabOne_400Regular",
          }}
        >
          {
            "THAM DỰ ĐẠI HỘI ĐẠI BIỂU ĐOÀN TNCS HỒ CHÍ MINH TỈNH TUYÊN QUANG\nLẦN THỨ XVI, NHIỆM KỲ 2022-2027"
          }
        </Text>
      </View>
    </View>
  );
}
