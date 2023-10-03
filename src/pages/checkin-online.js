import React, { useState, useCallback, useRef } from "react";
import { useWindowDimensions, ImageBackground } from "react-native";
import { Text, View, TextInput, Pressable, useSx } from "dripsy";
import { useFontSize } from "../hooks/useFontSize";
import AspectRatioImage from "../components/AspectRatioImage";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { STRAPI_ENDPOINT } from "../constants";
import { useLinkTo } from "@react-navigation/native";

import HttpClient from "../httpClient";

const bgImage = require("../../assets/checkin_bg.png");
const logoImage = require("../../assets/logo_daihoi_trans.png");

export default function CheckinOnline() {
  const linkTo = useLinkTo();
  const fontSize = useFontSize();
  const { height } = useWindowDimensions();

  const sx = useSx();
  const [code, setCode] = useState(__DEV__ ? "EP54J9" : "");
  const isProcessing = useRef(false);

  const [result, setResult] = useState({});

  const { headerType, aspectHeight, aspectAvatarHeight } = sx({
    headerType: [1, 2],
    aspectHeight: [height / 5, height / 4],
    aspectAvatarHeight: [height / 4, height / 2.5],
  });

  const onChangeText = useCallback((text) => {
    setCode(text?.toUpperCase());
  }, []);

  const onSubmit = useCallback(async () => {
    if (!code) {
      alert("Vui lòng nhập Mã điểm danh");
      return;
    }

    if (isProcessing.current) {
      return;
    }

    const { result } =
      (await HttpClient.post({
        method: "/face/checkin-code",
        body: { code },
      })) || {};

    if (!isEmpty(result)) {
      setResult(result);
    } else {
      alert("Vui lòng kiểm tra lại Mã điểm danh");
    }
  }, [code]);

  const avatarUri = `${STRAPI_ENDPOINT}${get(result, "face.avatar.url", "")}`;
  const name = get(result, "face.name", "");
  const title = get(result, "face.title", "");
  const donvi = get(result, "face.donvi", "");

  return (
    <ImageBackground source={bgImage} style={{ flex: 1 }}>
      <View sx={{ height, pt: "$3" }}>
        {headerType === 2 ? (
          <View
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              px: "$4",
              alignItems: "center",
            }}
          >
            <AspectRatioImage
              uri={logoImage}
              aspectHeight={aspectHeight}
              style={{ alignSelf: "center" }}
            />
            <Text
              sx={{
                textAlign: "center",
                px: "$4",
                py: "$3",
                fontSize: fontSize(28),
                fontWeight: 600,
                color: "#ffea00",
                fontFamily: "Alberta-Heavy",
                flexGrow: 1,
              }}
            >{`ĐẠI HỘI ĐẠI BIỂU ĐOÀN TNCS HỒ CHÍ MINH TỈNH TUYÊN QUANG LẦN THỨ XVI, NHIỆM KỲ 2022-2027`}</Text>
            <AspectRatioImage
              uri={logoImage}
              aspectHeight={aspectHeight}
              style={{ alignSelf: "center" }}
            />
          </View>
        ) : (
          <View>
            <AspectRatioImage
              uri={logoImage}
              aspectHeight={aspectHeight}
              style={{ alignSelf: "center" }}
            />
            <Text
              sx={{
                textAlign: "center",
                px: "$4",
                py: "$3",
                fontSize: fontSize(22),
                fontWeight: 600,
                color: "#ffea00",
                fontFamily: "Alberta-Heavy",
                flexGrow: 1,
              }}
            >{`ĐẠI HỘI ĐẠI BIỂU ĐOÀN TNCS HỒ CHÍ MINH TỈNH TUYÊN QUANG LẦN THỨ XVI, NHIỆM KỲ 2022-2027`}</Text>
          </View>
        )}

        {isEmpty(result) ? (
          <View sx={{ mt: "$2" }}>
            <TextInput
              value={code}
              placeholder="Nhập Mã Để Điểm Danh"
              selectionColor={"white"}
              placeholderTextColor={"white"}
              autoFocus={true}
              onChangeText={onChangeText}
              sx={{
                py: "$3",
                width: ["72%", "50%"],
                borderWidth: 4,
                borderColor: "white",
                alignSelf: "center",
                px: "$3",
                textAlign: "center",
                fontWeight: 500,
                fontSize: [fontSize(18), fontSize(16)],
                borderRadius: 12,
                color: "white",
                fontFamily: "Alberta-Heavy",
              }}
            />
            <Pressable
              sx={{
                bg: "$primary",
                alignItems: "center",
                justifyContent: "center",
                px: "$4",
                py: "$3",
                borderRadius: 8,
                alignSelf: "center",
                mt: ["$4", "$5"],
              }}
              onPress={onSubmit}
            >
              <Text
                sx={{
                  color: "$white",
                  fontSize: [fontSize(18), fontSize(16)],
                  fontWeight: 600,
                  fontFamily: "Alberta-Heavy",
                }}
              >
                {"Điểm Danh"}
              </Text>
            </Pressable>
            <Pressable
              sx={{
                alignItems: "center",
                justifyContent: "center",
                px: "$4",
                py: "$3",
                borderRadius: 8,
                alignSelf: "center",
                mt: "$2",
              }}
              onPress={() => linkTo("/trang-chu")}
            >
              <Text
                sx={{
                  color: "$white",
                  fontSize: [fontSize(18), fontSize(16)],
                  fontWeight: 400,
                  fontFamily: "Alberta-Heavy",
                  textDecorationLine: "underline",
                }}
              >
                {"Quay lại"}
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            sx={{
              mt: "$3",
              //   px: ["$3", "$3"],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AspectRatioImage
              uri={avatarUri}
              aspectHeight={aspectAvatarHeight}
              style={{
                boxShadow: `0px 8px 18px rgba(0, 25, 89, 0.5)`,
                borderRadius: 4,
              }}
            />
            <Text
              sx={{
                fontFamily: "Alberta-Heavy",
                fontSize: [fontSize(24), fontSize(22)],
                color: "$white",
                mt: "$3",
                textAlign: "center",
              }}
            >{`Đồng chí: ${name}`}</Text>
            <Text
              sx={{
                fontFamily: "Alberta-Heavy",
                fontSize: [fontSize(22), fontSize(20)],
                color: "$white",
                mt: "$2",
                textAlign: "center",
              }}
            >
              {title}
            </Text>
            <Text
              sx={{
                fontFamily: "Alberta-Heavy",
                fontSize: [fontSize(22), fontSize(20)],
                color: "$white",
                mt: "$2",
                textAlign: "center",
              }}
            >{`Đơn vị: ${donvi}`}</Text>
            <Pressable
              sx={{
                bg: "$primary",
                alignItems: "center",
                justifyContent: "center",
                px: "$4",
                py: "$3",
                borderRadius: 8,
                alignSelf: "center",
                mt: "$3",
              }}
              onPress={() => linkTo("/trang-chu")}
            >
              <Text
                sx={{
                  color: "$white",
                  fontSize: [fontSize(16), fontSize(14)],
                  fontWeight: 600,
                  fontFamily: "Alberta-Heavy",
                }}
              >
                {"TRANG CHỦ"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
