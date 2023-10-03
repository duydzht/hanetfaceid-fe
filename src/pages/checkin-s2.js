import { useContext, useEffect } from "react";
import { Dimensions, ImageBackground } from "react-native";
import { View, Text } from "dripsy";
import AspectRatioImage from "../components/AspectRatioImage";
import { StoreContext } from "../store";
import get from "lodash/get";
import capitalize from "lodash/capitalize";
import { useFontSize } from "../hooks/useFontSize";

import { STRAPI_ENDPOINT } from "../constants";
import { socket, CHECKIN_EVENT2 } from "../webSocket";
import { ADD_CHECKIN } from "../store/action";

const checkinBgImg = require("../../assets/checkin_bg.png");
const logoImage = require("../../assets/logo_daihoi_trans.png");

const { height } = Dimensions.get("screen");

const SCREEN_HEIGHT = height;
const MAX_AVATAR_IMAGE_HEIGHT = height / 2.2;
const MAX_LOGO_IMAGE_HEIGHT = height / 5;

const titleCase = (string) => {
  return string
    ?.toLowerCase()
    ?.trim()
    ?.split(" ")
    .map((w) => capitalize(w))
    .join(" ");
};

export default function CheckingS2() {
  const fontSize = useFontSize();
  const [
    {
      checkin: { current: checkinData },
    },
    dispatch,
  ] = useContext(StoreContext);

  useEffect(() => {
    socket.on(CHECKIN_EVENT2, ({ data }) => {
      console.log("CheckinS2", JSON.stringify(data));
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

  const name = get(
    checkinData,
    "face.name",
    __DEV__ ? "Đinh Thị Ngọc Bích" : ""
  );

  const title = get(
    checkinData,
    "face.title",
    __DEV__
      ? "Bí thư chi đoàn trường THCS Hòa Phú Bí thư chi đoàn trường THCS Hòa Phú"
      : ""
  );

  const donvi = get(
    checkinData,
    "face.donvi",
    __DEV__ ? "ĐOÀN HUYỆN CHIÊM HOÁ" : ""
  );

  return (
    <ImageBackground source={checkinBgImg} style={{ flex: 1 }}>
      <View sx={{ height: SCREEN_HEIGHT, pt: "$4" }}>
        <View
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            px: "$5",
          }}
        >
          <AspectRatioImage
            uri={logoImage}
            aspectHeight={MAX_LOGO_IMAGE_HEIGHT}
          />
          <Text
            sx={{
              textAlign: "center",
              px: "$4",
              fontSize: fontSize(28),
              fontWeight: 600,
              color: "#ffea00",
              fontFamily: "Alberta-Heavy",
              flexGrow: 1,
            }}
          >{`ĐẠI HỘI ĐẠI BIỂU\nĐOÀN TNCS HỒ CHÍ MINH TỈNH TUYÊN QUANG\nLẦN THỨ XVI, NHIỆM KỲ 2022-2027`}</Text>
          <AspectRatioImage
            uri={logoImage}
            aspectHeight={MAX_LOGO_IMAGE_HEIGHT}
          />
        </View>

        <View
          sx={{
            mt: "$4",
            px: ["$2", "$3"],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AspectRatioImage
            uri={
              __DEV__
                ? "https://qltuyenquang.daihoidoan.net/uploads/Dinh_Thi_Ngoc_Bich_TPT_Ld_truong_THCS_Hoa_Phu_sn1994_204289c1cd.jpg"
                : avatarUri
            }
            aspectHeight={MAX_AVATAR_IMAGE_HEIGHT}
            style={{
              boxShadow: `0px 8px 18px rgba(0, 25, 89, 0.5)`,
              borderRadius: 4,
            }}
          />
          {name && (
            <Text
              sx={{
                fontFamily: "Alberta-Heavy",
                fontSize: [fontSize(24), fontSize(22)],
                color: "$white",
                mt: "$4",
                textAlign: "center",
              }}
            >{`Đồng chí: ${name}`}</Text>
          )}
          {title && (
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
          )}
          {donvi && (
            <Text
              sx={{
                fontFamily: "Alberta-Heavy",
                fontSize: [fontSize(22), fontSize(20)],
                color: "$white",
                mt: "$2",
                textAlign: "center",
              }}
            >{`Đơn vị: ${donvi}`}</Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
