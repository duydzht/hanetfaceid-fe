import React, { useCallback, useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  Image,
  Pressable,
} from "react-native";
import Header, { HEADER_HEIGHT } from "./components/Header";
import Colors from "./colors";
import { scale, scaleFont } from "./utils";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useLinkTo } from "@react-navigation/native";
import { StoreContext } from "./store";
import { LOGIN_SUCCESS } from "./store/action";

const logoImg = require("../assets/logo.png");

export default function Login({ route: { params: { redirect = "" } = {} } }) {
  console.log("Login.redirect", redirect);
  const { getItem, setItem } = useAsyncStorage("@user");
  const linkTo = useLinkTo();
  const [{}, dispatch] = useContext(StoreContext);

  const { width, height } = useWindowDimensions();
  const CONTENT_HEIGHT = height - HEADER_HEIGHT;
  const containerStyle = {
    flex: 1,
    width,
    height,
  };
  const contentStyle = {
    width: width,
    height: CONTENT_HEIGHT,
    backgroundColor: Colors.background,
    paddingTop: scale(24),
    paddingHorizontal: scale(24),
    alignItems: "center",
  };

  const [email, setEmail] = useState(
    __DEV__ ? "daihoidoantuyenquang@gmail.com" : ""
  );
  const [password, setPassword] = useState(__DEV__ ? "Tuyenquang@123" : "");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = JSON.parse((await getItem()) || {});
        if (user?.email === "daihoidoantuyenquang@gmail.com") {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: user,
          });
          linkTo(`/${redirect}`);
        }
      } catch (error) {}
    };
    checkAuth();
  }, []);

  const onLogin = useCallback(async () => {
    if (
      email === "daihoidoantuyenquang@gmail.com" &&
      password === "Tuyenquang@123"
    ) {
      await setItem(
        JSON.stringify({
          email,
          password,
        })
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          email,
          password,
        },
      });
      linkTo(`/${redirect}`);
    } else {
      alert("Đăng nhập thất bại, vui lòng kiểm tra Email và Mật khẩu");
    }
  }, [email, password]);

  return (
    <View style={containerStyle}>
      <Header />
      <View style={contentStyle}>
        <Image source={logoImg} style={styles.logo} />
        <Text
          style={styles.title}
        >{`ĐOÀN TNCS HỒ CHÍ MINH TỈNH TUYÊN QUANG`}</Text>
        <TextInput
          numberOfLines={1}
          style={styles.input}
          keyboardType={"email-address"}
          value={email}
          onChangeText={(value) => setEmail(value)}
          placeholder={"Địa chỉ Email"}
        />
        <TextInput
          numberOfLines={1}
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder={"Mật khẩu"}
        />
        <Pressable style={styles.submitButton} onPress={onLogin}>
          <Text style={styles.submitText}>Đăng nhập</Text>
        </Pressable>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  logo: {
    width: scale(168),
    height: scale(176),
  },
  title: {
    marginTop: scale(40),
    fontSize: scale(26),
    fontWeight: "500",
    color: Colors.primaryColor,
    textAlign: "center",
  },
  input: {
    marginTop: scale(30),
    height: scale(80),
    width: "30%",
    borderRadius: scale(12),
    borderWidth: scale(4),
    borderColor: Colors.primaryColor,
    paddingHorizontal: scale(24),
    fontSize: scaleFont(24),
    fontWeight: "900",
  },
  submitButton: {
    width: "10%",
    marginTop: scale(30),
    paddingVertical: scale(20),
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(12),
  },
  submitText: {
    fontSize: scale(28),
    color: "white",
    fontWeight: "600",
  },
});
