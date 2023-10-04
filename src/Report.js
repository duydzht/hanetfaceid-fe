import React, { useContext, useEffect, useCallback, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import Header, { HEADER_HEIGHT } from "./components/Header";
import Colors from "./colors";
import { scale, convertCheckinData } from "./utils";
import { socket, CHECKIN_EVENT } from "./webSocket";
import { StoreContext } from "./store";
import { chain, get, filter } from "lodash";
import { dayIsToday } from "./datetime";
import ReportTable, { TYPE } from "./components/ReportTable";
import HttpClient from "./httpClient";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useLinkTo } from "@react-navigation/native";

import {
  FETCH_DELEGATE_LIST_START,
  FETCH_DELEGATE_LIST_FINISH,
  ADD_CHECKIN,
  UPDATE_DELEGATE_STATUS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./store/action";

export default function Report({ navigation }) {
  const { width, height } = useWindowDimensions();
  const { getItem, setItem } = useAsyncStorage("@user");
  const linkTo = useLinkTo();

  const CONTENT_HEIGHT = height - HEADER_HEIGHT;
  const [
    {
      delegate: { data },
      auth: { user },
    },
    dispatch,
  ] = useContext(StoreContext);

  const containerStyle = {
    flex: 1,
    width,
    height,
  };

  const contentStyle = {
    width: width,
    height: CONTENT_HEIGHT,
    flexDirection: "row",
    backgroundColor: Colors.background,
    paddingTop: scale(24),
    paddingHorizontal: scale(24),
    justifyContent: "space-between",
  };

  const fetchData = useCallback(async () => {
    dispatch({ type: FETCH_DELEGATE_LIST_START });
    try {
      const { data } = await HttpClient.get({
        method: "/faces",
        params: {
          populate: ["avatar", "checkins"],
          pagination: {
            page: 1,
            pageSize: 500,
          },
        },
      });
      dispatch({ type: FETCH_DELEGATE_LIST_FINISH, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_DELEGATE_LIST_FINISH, payload: [] });
    }
  }, [dispatch]);

  const checkAuth = async () => {
    try {
      const auth = JSON.parse((await getItem()) || {});
      if (auth?.email === "daihoidoanhatinh@gmail.com") {
        return auth;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      socket.on(CHECKIN_EVENT, ({ data }) => {
        console.log(CHECKIN_EVENT, data);
        dispatch({
          type: ADD_CHECKIN,
          payload: data,
        });
        dispatch({
          type: UPDATE_DELEGATE_STATUS,
          payload: convertCheckinData(data, false),
        });
      });
      fetchData();
    }
  }, [user]);

  const init = useCallback(async () => {
    const auth = await checkAuth();
    if (auth) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: auth,
      });
    } else {
      linkTo("/dang-nhap");
    }
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [navigation]);

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

  const sortedData = chain(data)
    .map((item) => ({
      ...item,
      firstCheckin: getFirstCheckin(get(item, "attributes.checkins.data", []))
        ?.attributes?.time,
    }))
    .orderBy("firstCheckin", "asc")
    .value();

  const checkedList = filter(sortedData, ({ firstCheckin }) => firstCheckin);

  const notCheckedList = filter(
    sortedData,
    ({ firstCheckin }) => !firstCheckin
  );

  const onLogout = useCallback(async () => {
    await setItem(null);
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    linkTo("/dang-nhap");
  }, []);

  return (
    <View style={containerStyle}>
      <Header showLgoutButton={user} onLogout={onLogout} />
      <View style={contentStyle}>
        <View style={{ flex: 1 }}>
          <ReportTable type={TYPE.CHECKED_IN} data={checkedList} />
        </View>
        <View style={{ flex: 1 }}>
          <ReportTable type={TYPE.NOT_CHECKED_IN} data={notCheckedList} />
        </View>
      </View>
    </View>
  );
}
