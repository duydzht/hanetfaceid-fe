import React, { useContext } from "react";
import { View, Text } from "react-native";
import Colors from "../colors";
import { scale } from "../utils";
import { chain, get } from "lodash";
import { dayIsToday } from "../datetime";
import { StoreContext } from "../store";

export default function SummaryView() {
  const [
    {
      delegate: { data },
    },
    dispatch,
  ] = useContext(StoreContext);

  const getFirstCheckin = (checkInList) => {
    return chain(checkInList)
      .map((item) => ({
        ...item,
        attributes: {
          ...item.attributes,
          time: new Date(Number(item.attributes.time)),
        },
      }))
      .filter((item) => dayIsToday(item?.attributes?.time))
      .orderBy((item) => item.attributes.time, "asc")
      .value()[0];
  };

  const dataWithFirstCheckin = (data || []).map((item) => ({
    ...item,
    firstCheckin: getFirstCheckin(get(item, "attributes.checkins.data", []))
      ?.attributes?.time,
  }));

  const total = dataWithFirstCheckin?.length || 0;
  const checkedIn =
    dataWithFirstCheckin.filter(({ firstCheckin }) => firstCheckin)?.length ||
    0;

  if (total <= 0) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: scale(8),
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
      }}
    >
      <Text
        style={{
          color: Colors.primaryDarkColor,
          fontSize: 16,
          fontWeight: 400,
        }}
      >
        {`Đại biểu đã có mặt: `}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: Colors.primaryDarkColor,
        }}
      >
        {`${checkedIn} / ${total}`}
      </Text>
    </View>
  );
}
