import React, { useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button } from "react-native";
import { get } from "lodash";
import { scale, scaleFont } from "../utils";
import { STRAPI_ENDPOINT } from "../constants";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { formatDate } from "../datetime";
import dayjs from "dayjs";
import HttpClient from "../httpClient";

const FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const FILE_EXTENSION = ".xlsx";

export const TYPE = {
  CHECKED_IN: 1,
  NOT_CHECKED_IN: 0,
};

const IMAGE_SIZE = scale(80);
const ReportTableRow = ({ data, type }) => {
  const thumbUri = `${STRAPI_ENDPOINT}${get(
    data,
    "attributes.avatar.data.attributes.url",
    ""
  )}`;

  const manualCheckin = useCallback(() => {
    const {
      id,
      attributes: {
        name,
        title,
        avatar: {
          data: {
            attributes: { url },
          },
        },
      },
    } = data;

    const body = {
      time: Date.now(),
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      aliasID: `${id}`,
      placeID: "11497",
      deviceID: "C21282M233",
      personID: "",
      data_type: "log",
      personName: name,
      personTitle: title,
      personType: "0",
      action_type: "update",
      detected_image_url: `${STRAPI_ENDPOINT}${url}`,
    };

    console.log(body);

    HttpClient.post({
      method: "/hanet/data",
      body,
    });
  }, [data]);

  return (
    <View
      style={{
        paddingVertical: scale(12),
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: thumbUri,
        }}
        style={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          borderRadius: IMAGE_SIZE / 2,
        }}
      />
      <View
        style={{
          flexGrow: 1,
          flex: 1,
          paddingHorizontal: scale(16),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexGrow: 1, flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: scaleFont(18), fontWeight: "600" }}
          >
            {get(data, "attributes.name")}
          </Text>
          <Text
            numberOfLines={2}
            style={{ fontSize: scaleFont(16), fontWeight: "400" }}
          >
            {get(data, "attributes.title")}
          </Text>
        </View>

        {type === TYPE.CHECKED_IN ? (
          <Text>{formatDate(get(data, "firstCheckin", ""))}</Text>
        ) : (
          <Button title="Điểm danh" onPress={manualCheckin} />
        )}
      </View>
    </View>
  );
};

export default function ReportTable({ type, title, data }) {
  const exportToCSV = useCallback(() => {
    const csvData = (data || []).map(
      ({
        attributes: { name, genre, bod, title, donvi, phanloai },
        firstCheckin,
      }) => ({
        name,
        genre,
        bod,
        title,
        donvi,
        phanloai,
        firstCheckin: formatDate(firstCheckin),
      })
    );

    let Heading = [
      [
        "Họ Tên",
        "Giới tính",
        "Ngày sinh",
        "Chức vụ",
        "Đơn vị",
        "Khối",
        "Xuất hiện",
      ],
    ];

    const fileName =
      `bao_cao_${type === TYPE.CHECKED_IN ? "co_mat" : "chua_co_mat"}_${dayjs(
        new Date()
      ).format("DD-MM-YYYY")}` + FILE_EXTENSION;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, Heading);
    XLSX.utils.sheet_add_json(ws, csvData, { origin: "A2", skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, "Đại hội");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: FILE_TYPE });
    FileSaver.saveAs(fileData, fileName);
  }, [data]);
  const renderItem = useCallback(
    ({ item }) => <ReportTableRow type={type} data={item} />,
    []
  );
  return (
    <View style={{ flex: 1, paddingHorizontal: scale(40) }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: scaleFont(16), fontWeight: "500" }}>
            {`${type === TYPE.CHECKED_IN ? "Có mặt" : "Chưa có mặt"}: `}
          </Text>
          <Text
            style={{
              fontSize: scaleFont(20),
              fontWeight: "800",
              paddingRight: scale(16),
            }}
          >
            {get(data, "length", 0)}
          </Text>
        </View>
        <Button title="Xuất Excel" onPress={exportToCSV} />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
      />
    </View>
  );
}

let styles = StyleSheet.create({});
