import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "dripsy";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
const SEAT_SIZE = 25;
const LOBBY_SIZE = 30;

let styles = StyleSheet.create({
  lobby: {
    width: LOBBY_SIZE,
    height: SEAT_SIZE,
  },
  box: {
    width: SEAT_SIZE * 2,
    height: SEAT_SIZE * 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  rowTitle: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  rowLabel: {
    color: "black",
    fontWeight: "600",
  },
});

const SeatMapRow = ({ total = 22, rowLabel = "Q", left, right }) => {
  const array = Array.from({ length: total }, (v, k) => k + 1);
  const leftArray = array.filter((item) => item % 2 !== 0).reverse();
  const rightArray = array.filter((item) => item % 2 === 0);

  const leftSeats = useMemo(
    () =>
      left?.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue?.range?.length,
        0
      ) || 0,
    [left]
  );

  const leftSeatNames = useMemo(() => {
    const result = left?.reduce(
      (previousValue, currentValue) =>
        previousValue?.concat(currentValue?.names || []),
      []
    );

    return [
      ...Array(get(leftArray, "length", 0) - get(result, "length", 0)).fill(""),
      ...(result || []),
    ];
  }, [left]);

  const rightSeats = useMemo(
    () =>
      right?.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue?.range?.length,
        0
      ) || 0,
    [right]
  );

  const rightSeatNames = useMemo(
    () =>
      right?.reduce(
        (previousValue, currentValue) =>
          previousValue?.concat(currentValue?.names || []),
        []
      ) || [],
    [right]
  );

  const colorLeft = (item) =>
    left?.find(({ range }) => range.includes(item))?.bg;

  const colorRight = (item) =>
    right?.find(({ range }) => range.includes(item))?.bg;

  const showRowTitle = useMemo(() => left || right, [left, right]);

  const expandedRow = useMemo(
    () =>
      !isEmpty(leftSeatNames?.filter((item) => item)) ||
      !isEmpty(rightSeatNames?.filter((item) => item)),
    [leftSeatNames, rightSeatNames]
  );

  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        {showRowTitle && (
          <View
            style={{
              height: SEAT_SIZE,
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View style={{ flex: leftArray.length - leftSeats }} />
            {left?.map(({ label, range, bg, align }, index) => (
              <View
                key={index}
                style={{
                  flex: range?.length || 1,
                  backgroundColor: bg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  numberOfLines={2}
                  style={[styles.rowTitle, align ? { textAlign: align } : {}]}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>
        )}
        <View style={{ flexDirection: "row" }}>
          {leftArray?.map((item, index) => (
            <View
              key={`${rowLabel}-left-${index}`}
              style={[
                styles.box,
                {
                  backgroundColor: colorLeft(item),
                  height: expandedRow ? SEAT_SIZE * 2 : SEAT_SIZE,
                },
              ]}
            >
              <Text
                style={{ textAlign: "center", fontSize: expandedRow ? 11 : 12 }}
              >
                {leftSeatNames[index] || item}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View
        style={[
          styles.box,
          {
            height: showRowTitle
              ? expandedRow
                ? SEAT_SIZE * 3
                : SEAT_SIZE * 2
              : SEAT_SIZE,
          },
        ]}
      >
        <Text style={styles.rowLabel}>{rowLabel}</Text>
      </View>
      <View style={styles.lobby} />
      <View
        style={[
          styles.box,
          {
            height: showRowTitle
              ? expandedRow
                ? SEAT_SIZE * 3
                : SEAT_SIZE * 2
              : SEAT_SIZE,
          },
        ]}
      >
        <Text style={styles.rowLabel}>{rowLabel}</Text>
      </View>
      <View>
        {showRowTitle && (
          <View
            style={{
              height: SEAT_SIZE,
              flexDirection: "row",
              flex: 1,
            }}
          >
            {right?.map(({ label, range, bg, align }, index) => (
              <View
                key={index}
                style={{
                  flex: range?.length,
                  backgroundColor: bg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[styles.rowTitle, align ? { textAlign: align } : {}]}
                >
                  {label}
                </Text>
              </View>
            ))}
            <View style={{ flex: rightArray?.length - rightSeats }} />
          </View>
        )}
        <View style={{ flexDirection: "row" }}>
          {rightArray?.map((item, index) => (
            <View
              key={`${rowLabel}-right-${index}`}
              style={[
                styles.box,
                {
                  backgroundColor: colorRight(item),
                  height: expandedRow ? SEAT_SIZE * 2 : SEAT_SIZE,
                },
              ]}
            >
              <Text
                style={{ textAlign: "center", fontSize: expandedRow ? 11 : 12 }}
              >
                {rightSeatNames[index] || item}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default function SeatMap({ width, onLayout, data }) {
  return (
    <View sx={{ alignItems: "center" }} onLayout={onLayout}>
      {data.map(({ rowLabel, total, left, right }, index) => (
        <SeatMapRow
          key={index}
          rowLabel={rowLabel}
          total={total}
          left={left}
          right={right}
        />
      ))}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          marginTop: 12,
        }}
      >
        <Text
          style={{
            color: "black",
            paddingHorizontal: 32,
            paddingVertical: 12,
            fontWeight: 600,
          }}
        >
          CỬA CHÍNH
        </Text>
      </View>
    </View>
  );
}
