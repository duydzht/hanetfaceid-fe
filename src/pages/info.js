import { useEffect, useContext, useCallback, useRef } from "react";
import { View, Image, FlatList, Text, Pressable, useSx } from "dripsy";
import Header from "../components/Header";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { StoreContext } from "../store";
import { useLinkTo } from "@react-navigation/native";
import { STRAPI_ENDPOINT } from "../constants";
import HttpClient from "../httpClient";
import get from "lodash/get";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot-with-web-support";
import * as FileSaver from "file-saver";

import {
  FETCH_DELEGATE_LIST_START,
  FETCH_DELEGATE_LIST_FINISH,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../store/action";
import Container from "../components/Container";
// const logoImg = require("../../assets/logo_daihoi.png");

const AVATAR_SIZE = 120;

const FaceItem = ({ item, index }) => {
  const avatarUri = `${STRAPI_ENDPOINT}${get(
    item,
    "attributes.avatar.data.attributes.url"
  )}`;
  const name = get(item, "attributes.name")?.trim();
  const title = get(item, "attributes.title")?.trim();
  const code = get(item, "attributes.code")?.trim();

  const sx = useSx();

  const { QR_SIZE, QR_PADDING, AVATAR_SIZE } = sx({
    QR_SIZE: [100, 300],
    QR_PADDING: [12, 24],
    AVATAR_SIZE: [80, 120],
  });

  const captureRef = useRef(null);

  return (
    <View
      sx={{
        flexDirection: "row",
        py: "$2",
        px: "$2",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#dedede",
      }}
    >
      <Text sx={{ fontWeight: "600", pr: "$3" }}>{`${index + 1}`}</Text>
      <Image
        source={{ uri: avatarUri }}
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          borderRadius: AVATAR_SIZE / 2,
        }}
      />
      <View
        sx={{
          flexGrow: 1,
          flex: 1,
          px: "$3",
          py: "$2",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text sx={{ fontWeight: 600, fontSize: 16 }}>{name}</Text>
        <Text sx={{ fontWeight: 400, mt: "$2" }}>{title}</Text>
        <Text
          sx={{
            fontWeight: 400,
            mt: "$2",
            bg: "#1F85CA",
            color: "$white",
            fontWeight: 700,
            fontSize: 16,
            px: "$2",
            py: "$2",
            borderRadius: 8,
          }}
        >
          {code}
        </Text>
      </View>
      <View>
        {code && (
          <>
            <ViewShot
              ref={captureRef}
              options={{ with: 512, height: 512 }}
              style={{ padding: QR_PADDING }}
            >
              <QRCode color="#1F85CA" value={code} size={QR_SIZE} />
            </ViewShot>
            <Pressable
              sx={{
                bg: "$primary",
                mt: "$2",
                justifyContent: "center",
                alignItems: "center",
                py: "$2",
              }}
              onPress={() =>
                captureRef.current?.capture().then((data) => {
                  console.log(data);
                  fetch(data)
                    .then((res) => res.blob())
                    .then((blob) => {
                      FileSaver.saveAs(blob, `${name.replace(" ", "_")}.png`);
                    });
                })
              }
            >
              <Text sx={{ color: "$white", fontWeight: 600, fontSize: 16 }}>
                Tải về
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default function Info({ navigation }) {
  const { getItem, setItem } = useAsyncStorage("@user");
  const linkTo = useLinkTo();

  const [
    {
      delegate: { data },
      auth: { user },
    },
    dispatch,
  ] = useContext(StoreContext);

  const checkAuth = async () => {
    try {
      const auth = JSON.parse((await getItem()) || {});
      if (auth?.email === "daihoidoantuyenquang@gmail.com") {
        return auth;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const init = useCallback(async () => {
    const auth = await checkAuth();
    if (auth) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: auth,
      });
    } else {
      linkTo("/dang-nhap/thong-tin-dai-bieu");
    }
  }, [dispatch]);

  const onLogout = useCallback(async () => {
    await setItem(null);
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    linkTo("/dang-nhap/thong-tin-dai-bieu");
  }, []);

  useEffect(() => {
    init();
  }, [navigation]);

  const fetchData = useCallback(async () => {
    dispatch({ type: FETCH_DELEGATE_LIST_START });
    try {
      const { data } = await HttpClient.get({
        method: "/faces",
        params: {
          populate: ["avatar"],
          sort: ["stt:asc"],
          pagination: {
            page: 1,
            pageSize: 500,
          },
        },
      });
      console.log("Info.fetchData.data", data);
      dispatch({ type: FETCH_DELEGATE_LIST_FINISH, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_DELEGATE_LIST_FINISH, payload: [] });
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const renderItem = ({ item, index }) => {
    return <FaceItem item={item} index={index} />;
  };

  return (
    <View sx={{ flex: 1, bg: "$white" }}>
      <Header showLogoutButton={user} onLogout={onLogout} />
      <Container>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
        />
      </Container>
    </View>
  );
}
