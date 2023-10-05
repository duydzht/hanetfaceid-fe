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

const backgroungImg = require("../../assets/banner-checkin-2.png");
const logoImg = require("../../assets/logo_daihoi.png");

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
    <View style={{ flex: 1, maxWidth: "100%" }}>
      <ImageBackground
        source={backgroungImg}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        {checkinData ? (
          <>
            <View sx={{ alignItems: "start", px: "$4" }}>
              <View sx={{ alignItems: "start", pt: "$5" }}>
                <Text sx={{ color: "#fff", fontSize: 38, fontWeight: 500 }}>
                  {"CHÀO MỪNG ĐẠI BIỂU"}
                </Text>
                <Text
                  sx={{
                    color: "#ff4d00",
                    fontSize: 44,
                    mt: "$2",
                    fontWeight: 700,
                    marginTop: 80
                  }}
                >
                  {/* {get(checkinData, "face.personName", "")?.toUpperCase()} */}
                  {(checkinData?.personName)?.toUpperCase()}
                </Text>
                <Text
                  sx={{
                    color: "#007434",
                    fontSize: 40,
                    mt: "$2",
                    fontWeight: 500,
                    marginTop: 80
                  }}
                >
                  {(checkinData.personTitle)?.toUpperCase()}
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
          <View style={styles.overlay}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
              }}
            >
              <View
                style={{
                  height: "70vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    color: "#fff",
                    fontSize: 44,
                    lineHeight: 62,
                    fontWeight: 700,
                    fontFamily: "Cochin",
                    marginLeft: 100,
                  }}
                >
                  {"CHÀO MỪNG KỶ NIỆM\nNGÀY CHUYỂN ĐỔI SỐ QUỐC GIA"}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "#fff",
            width: 640,
            height: 360,
          }}
        >
          <Webcam
            audio={false}
            height={360}
            screenshotFormat="image/jpeg"
            width={640}
            videoConstraints={videoConstraints}
          >
            {/* {({ getScreenshot }) => (
                      <button
                        onClick={() => {
                          const imageSrc = getScreenshot();
                        }}
                      >
                        Capture photo
                      </button>
                    )} */}
          </Webcam>
        </View>
      </ImageBackground>
    </View>
  );
}
