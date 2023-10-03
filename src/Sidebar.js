import React, { useContext, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { socket, CHECKIN_EVENT, CHECKIN_EVENT2 } from "./webSocket";
import HttpClient from "./httpClient";
import { StoreContext } from "./store";
import { scale, convertCheckinData } from "./utils";
import QrCodeDetection from "./components/QrCodeDetection";

import {
  FETCH_CHECKIN_LIST_START,
  FETCH_CHECKIN_LIST_FINISH,
  ADD_CHECKIN,
  UPDATE_DELEGATE_STATUS,
} from "./store/action";
import SectionHeader from "./components/SectionHeader";
// import FaceDetection from "./components/FaceDetection";
import FaceRecognition from "./components/FaceRecognition";
import SummaryView from "./components/SummaryView";

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: "white",
    borderRadius: scale(8),
  },
});

export default function Sidebar({ height, width, area }) {
  const [
    {
      checkin: { current: checkinData },
    },
    dispatch,
  ] = useContext(StoreContext);

  const fetchData = useCallback(async () => {
    dispatch({ type: FETCH_CHECKIN_LIST_START });
    try {
      const { data } = await HttpClient.get({
        method: "/checkins",
        params: {
          populate: ["face.avatar"],
          sort: ["createdAt:desc"],
        },
      });
      console.log("FacialRecognition.fetchData", data);
      dispatch({ type: FETCH_CHECKIN_LIST_FINISH, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_CHECKIN_LIST_FINISH, payload: [] });
    }
  }, []);

  useEffect(() => {
    socket.on(
      Number(area) === 2 ? CHECKIN_EVENT2 : CHECKIN_EVENT,
      ({ data }) => {
        console.log("Sidebar.data", data);
        dispatch({
          type: ADD_CHECKIN,
          payload: data,
        });
        dispatch({
          type: UPDATE_DELEGATE_STATUS,
          payload: convertCheckinData(data, false),
        });
      }
    );
    // fetchData();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <SummaryView />
      <View style={styles.content}>
        <SectionHeader title={"Ảnh nhận diện"} borderTop={true} />
        <QrCodeDetection width={width} area={area} />
        <SectionHeader title={"Thông tin dữ liệu"} />
        <FaceRecognition
          width={width}
          height={height}
          checkinData={checkinData}
        />
      </View>
    </View>
  );
}
