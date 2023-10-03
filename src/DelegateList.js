import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { FlatList, View } from "react-native";
import DelegateItem from "./DelegateItem";
import HttpClient from "./httpClient";
import { StoreContext } from "./store";
import { chain, get, filter } from "lodash";
import { dayIsToday } from "./datetime";

import {
  FETCH_DELEGATE_LIST_START,
  FETCH_DELEGATE_LIST_FINISH,
} from "./store/action";
import { scale } from "./utils";

export default function DelegateList({
  width,
  height,
  numColumns = 5,
  columnGap = scale(12),
}) {
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

  const sortedData = [
    ...chain(dataWithFirstCheckin)
      .filter(({ firstCheckin }) => firstCheckin)
      .orderBy("firstCheckin", "desc")
      .value(),
    ...filter(dataWithFirstCheckin, ({ firstCheckin }) => !firstCheckin),
  ];

  const itemWidth = useMemo(() => {
    return (width - columnGap * (numColumns + 1)) / numColumns;
  }, [width, numColumns, columnGap]);

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

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <DelegateItem
          index={index}
          numColumns={numColumns}
          columnGap={columnGap}
          data={item}
          width={itemWidth}
        />
      );
    },
    [numColumns, columnGap, itemWidth]
  );

  return (
    <View style={{ height }}>
      <FlatList
        data={sortedData}
        numColumns={numColumns}
        contentContainerStyle={{ paddingBottom: 2 * columnGap }}
        renderItem={renderItem}
      />
    </View>
  );
}
