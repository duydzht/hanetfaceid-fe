import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { scale, scaleFontVertical } from "../utils";
import Colors from "../colors";

export default function SectionHeader({ title, borderTop = false }) {
  return (
    <View style={[styles.sectionHeader, borderTop ? styles.borderTop : {}]}>
      <Text style={styles.sectionHeaderTitle}>{title}</Text>
    </View>
  );
}

let styles = StyleSheet.create({
  sectionHeader: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(8),
    backgroundColor: Colors.primaryColor,
  },
  sectionHeaderTitle: {
    color: "white",
    fontSize: scaleFontVertical(14),
    fontWeight: 400,
  },
  borderTop: {
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
  },
});
