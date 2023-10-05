import React, { useContext, useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { View, Text, Image } from "dripsy";
import AspectRatioImage from "../components/AspectRatioImage";
import { StoreContext } from "../store";
import get from "lodash/get";
import { STRAPI_ENDPOINT } from "../constants";
import { socket, CHECKIN_EVENT } from "../webSocket";
import { ADD_CHECKIN } from "../store/action";
import Webcam from "react-webcam";

const backgroungImg = require("../../assets/banner-checkin-3.jpg");
const logoImg = require("../../assets/logo-vietFuture.svg");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu đen với độ trong suốt 50%
  },
});

const videoConstraints = {
  width: 640,
  height: 360,
  facingMode: "user",
};

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
    <View
      style={{ flex: 1, maxWidth: "100%", overflow: "hidden", height: "100vh" }}
    >
      <ImageBackground
        source={backgroungImg}
        resizeMode="cover"
        style={{ flex: 1, height: "100%" }}
      >
        {checkinData ? (
          <>
            <View sx={{ alignItems: "center", px: "$4" }}>
              <View sx={{ alignItems: "center", pt: "$5" }}>
                <Text
                  sx={{
                    color: "#ff4d00",
                    fontSize: 44,
                    fontWeight: 500,
                    fontFamily: "'Times New Roman', Georgia, Serif",
                  }}
                >
                  {"KÍNH MỜI ĐỒNG CHÍ "}
                  <Text
                  sx={{
                    color: "#ff4d00",
                    fontSize: 44,
                    mt: "$2",
                    fontWeight: 700,
                    fontFamily: "'Times New Roman', Georgia, Serif",
                  }}
                >
                  {checkinData?.personName?.toUpperCase()}
                </Text>
                </Text>
                <Text
                  sx={{
                    color: "#ff4d00",
                    fontSize: 44,
                    mt: "$2",
                    fontWeight: 500,
                    fontFamily: "'Times New Roman', Georgia, Serif",
                  }}
                >
                  {checkinData.personTitle?.toUpperCase()}
                </Text>
                <Text
                  style={{
                    fontSize: 44,
                    mt: "$2",
                    fontWeight: 500,
                    fontFamily: "'Times New Roman', Georgia, Serif",
                    textAlign: "center",
                    color: "#007434",
                  }}
                >
                  {"TRẢI NGHIỆM HỆ THỐNG NHẬN DIỆN BẰNG CÔNG NGHỆ AI"}
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
                {/* <Image source={logoImg} style={{ width: 300, height: 201 }} /> */}
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
          <View style={{ height: "100%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                paddingTop: 100,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "",
                  alignItems: "center",
                  gap: 40,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#ff4d00",
                    fontSize: 50,
                    lineHeight: 62,
                    fontWeight: 900,
                    fontFamily: "'Times New Roman', Georgia, Serif",
                    // fontFamily: "'lucida grande', tahoma, verdana, arial, sans-serif",
                    // fontFamily: "Cochin",
                  }}
                >
                  {"CHÀO MỪNG KỶ NIỆM\nNGÀY CHUYỂN ĐỔI SỐ QUỐC GIA"}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View>
          <Text style={{ color: "#ff4d00", paddingLeft: '50px' }}>
            {"Công ty cổ phần công nghệ VIETFUTURE"}
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          marginVertical: "auto",
          // display: "flex",
          // alignItems: "center",
          position: "absolute",
          bottom: 130,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Webcam
          audio={false}
          height={360}
          screenshotFormat="image/jpeg"
          width={640}
          videoConstraints={videoConstraints}
          style={{ background: "#fff" }}
        ></Webcam>
      </View>
    </View>
  );
}
