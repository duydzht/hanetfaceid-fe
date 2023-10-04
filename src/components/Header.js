import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { scale, scaleFont } from "../utils";
import Colors from "../colors";

const logoImg = require("../../assets/logo.png");

export const HEADER_HEIGHT = scale(60);

export default function Header({ showLgoutButton, onLogout }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image source={logoImg} style={styles.headerLeftImg} />
        <Text
          style={{
            color: "white",
            marginLeft: scale(8),
            fontSize: scaleFont(16),
          }}
        >{`ĐOÀN THANH NIÊN\nCỘNG SẢN HỒ CHÍ MINH TỈNH HÀ TĨNH`}</Text>
      </View>
      <Text style={styles.headerText}>{"Hệ thống điểm danh"}</Text>
      {showLgoutButton && (
        <Pressable style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      )}
    </View>
  );
}

let styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryDarkColor,
    justifyContent: "center",
    alignItems: "center",
    height: HEADER_HEIGHT,
  },
  headerLeft: {
    position: "absolute",
    left: scale(24),
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerLeftImg: {
    width: scale(42),
    height: scale(44),
  },
  headerText: {
    fontSize: scaleFont(24),
    color: "white",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    top: 0,
    height: HEADER_HEIGHT,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "",
    paddingHorizontal: scale(30),
  },
  logoutText: {
    color: "white",
    fontSize: scaleFont(18),
    fontWeight: "700",
  },
});
