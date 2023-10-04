import React, { useContext, useEffect } from "react";
import { ImageBackground } from "react-native";
import { View, Text, Image } from "dripsy";
import AspectRatioImage from "../components/AspectRatioImage";
import { StoreContext } from "../store";
import get from "lodash/get";
import { STRAPI_ENDPOINT } from "../constants";
import { socket, CHECKIN_EVENT } from "../webSocket";
import { ADD_CHECKIN } from "../store/action";

const backgroungImg = require("../../assets/checkin.png");
const logoImg = require("../../assets/logo_daihoi.png");

export default function Checkin() {
  const [
    {
      checkin: { current: checkinData },
    },
    dispatch,
  ] = useContext(StoreContext);

  useEffect(() => {
    socket.on(CHECKIN_EVENT, ({ data }) => {
      console.log(CHECKIN_EVENT, data);
      
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

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={backgroungImg}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        {checkinData?.face ? (
          <>
            <View sx={{ alignItems: "center", px: "$4" }}>
              <View sx={{ alignItems: "center", pt: "$5" }}>
                <Text sx={{ color: "#007434", fontSize: 44, fontWeight: 500 }}>
                  {"CHÀO MỪNG ĐẠI BIỂU"}
                </Text>
                <Text
                  sx={{
                    color: "#ff0000",
                    fontSize: 50,
                    mt: "$2",
                    fontWeight: 600,
                  }}
                >
                  {get(checkinData, "face.name", "")?.toUpperCase()}
                </Text>
                <Text
                  sx={{
                    color: "#007434",
                    fontSize: 46,
                    mt: "$2",
                    fontWeight: 500,
                  }}
                >
                  {get(checkinData, "face.title", "")?.toUpperCase()}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexGrow: 1,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingRight: 34,
                }}
              >
                <Image source={logoImg} style={{ width: 300, height: 201 }} />
              </View>
              <View
                style={{ flex: 1, justifyContent: "center", paddingLeft: 32 }}
              >
                <AspectRatioImage
                  uri={avatarUri}
                  aspectWidth={300}
                  style={{
                    borderWidth: 1,
                    borderColor: "#007434",
                    backgroungColor: "red",
                  }}
                />
              </View>
            </View>
          </>
        ) : (
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flex: 1, paddingTop: 32 }}>
              <Image source={logoImg} style={{ width: 300, height: 201 }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#ff4d00",
                  fontSize: 50,
                  lineHeight: 62,
                  fontWeight: 700,
                  fontFamily: "Cochin"
                }}
              >
                {
                  "CHÀO MỪNG KỈ NIỆM\nNGÀY CHUYỂN ĐỔI SỐ QUỐC GIA"
                }
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text
                style={{
                  alignSelf: "flex-end",
                  color: "#260fd1",
                  fontSize: 40,
                  paddingBottom: 30,
                  fontWeight: 600,
                  fontStyle: "italic",
                }}
              >
                ĐOÀN KẾT - BẢN LĨNH - KHÁT VỌNG - TIÊN PHONG - SÁNG TẠO
              </Text>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
