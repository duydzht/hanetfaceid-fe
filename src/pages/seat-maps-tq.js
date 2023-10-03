import React, { useState, useEffect, useRef, useCallback } from "react";
import { InteractionManager, useWindowDimensions } from "react-native";
import { Text, View, ScrollView, Pressable } from "dripsy";
import DefaultLayout from "../layouts/default";
import { useLayout } from "../hooks/useLayout";
import { useFontSize } from "../hooks/useFontSize";
import SegmentedControl from "../components/SegmentedControl";
import chunk from "lodash/chunk";
import {
  SESSION_1_AND_2,
  SESSION_3,
  s3Notes,
  s12Notes,
} from "../data/seat-maps-tq";

const ITEMS = [
  { name: "PHIÊN I", value: 0, session: SESSION_1_AND_2, notes: s12Notes },
  { name: "PHIÊN II", value: 1, session: SESSION_1_AND_2, notes: s12Notes },
  { name: "PHIÊN TRỌNG THỂ", value: 2, session: SESSION_3, notes: s3Notes },
];

const ROW_LABEL_WIDTH = 34;
const ROW_LABEL_HEIGHT = 20;
const SPACE_BETWEEN_AREA = 40;

const LabelColumn = ({ data }) => {
  return (
    <View
      sx={{
        width: ROW_LABEL_WIDTH,
        borderWidth: 1,
        borderColor: "black",
      }}
    >
      {data.map((item, index) => {
        return (
          <View
            key={index}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              height: ROW_LABEL_HEIGHT,
              ...(index !== 0 && {
                borderTopWidth: 1,
                borderTopColor: "black",
              }),
            }}
          >
            <Text
              sx={{
                textAlign: "center",
              }}
            >
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const SpecialAreaItem = ({ data, style }) => {
  const fontSize = useFontSize();
  return (
    <View
      sx={{
        flexDirection: "row",
        width: [120, 168],
        minHeight: 160,
        borderWidth: 1,
        borderColor: "black",
      }}
      style={style}
    >
      {data.map((item, index) => {
        return (
          <View
            key={index}
            sx={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              px: "$2",
              bg: "$white",
              ...(index > 0 && {
                borderLeftWidth: 1,
                borderLeftColor: "black",
              }),
            }}
          >
            <Text
              sx={{
                fontSize: [fontSize(14), fontSize(9)],
                textAlign: "center",
                fontWeight: item.name ? 400 : 500,
              }}
            >
              {item.prefix ? <Text>{`${item.prefix}\n`}</Text> : null}
              {item.name ? (
                <Text sx={{ fontWeight: 600 }}>{`${item.name}${
                  item.title ? "\n\n" : ""
                }`}</Text>
              ) : null}
              {item.title && <Text>{`${item.title}`}</Text>}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const SpecialArea = ({ data, style }) => {
  const chunkedData = chunk(data, 2);
  return (
    <View sx={{ flexDirection: "row" }} style={style}>
      {chunkedData.map((item, index) => {
        return (
          <SpecialAreaItem
            key={index}
            data={item}
            style={{
              marginLeft: index > 0 ? 10 : 0,
            }}
          />
        );
      })}
    </View>
  );
};

const SeatArea = ({ data, style, range = [15, 27] }) => {
  const { labels, values } = data;
  const fontSize = useFontSize();

  const emtyRows =
    labels?.length -
      values?.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue?.totalRows,
        0
      ) || 0;

  return (
    <View
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: 300,
      }}
      style={style}
    >
      <LabelColumn data={labels} emtyRows={emtyRows} />
      <View
        sx={{
          flexGrow: 1,
          bg: "$white",
          flex: 1,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: "black",
          borderBottomColor: "black",
        }}
      >
        {values.map((item, index) => {
          const { title, totalRows, bg, range } = item;
          return (
            <Pressable
              onPress={() => alert(title)}
              key={index}
              sx={{
                flex: totalRows,
                ...(index > 0 && {
                  borderTopWidth: 1,
                  borderTopColor: "black",
                }),
                ...(bg && {
                  backgroundColor: bg,
                }),
              }}
            >
              {Array.from(Array(totalRows), (_, index) => index + 1).map(
                (item, index) => {
                  return (
                    <View
                      key={index}
                      sx={{
                        flex: 1,
                        flexDirection: "row",
                        ...(index > 0 && {
                          borderTopWidth: 1,
                          borderTopColor: "black",
                        }),
                      }}
                    >
                      {range?.map((item, index) => {
                        return (
                          <View
                            key={index}
                            sx={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              ...(index > 0 && {
                                borderLeftWidth: 1,
                                borderLeftColor: "black",
                              }),
                            }}
                          >
                            <Text
                              sx={{
                                fontWeight: 500,
                                fontSize: [fontSize(14), fontSize(9)],
                              }}
                            >
                              {item}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                }
              )}
            </Pressable>
          );
        })}
        {emtyRows > 0 && (
          <View
            sx={{
              flex: emtyRows,
              borderTopWidth: 1,
              borderTopColor: "black",
            }}
          />
        )}
      </View>
      <LabelColumn data={data.labels} emtyRows={emtyRows} />
    </View>
  );
};

const SeatAreas = ({ data, notes, onLayout }) => {
  const { area1, area2, area3 } = data;
  const { width } = useWindowDimensions();
  const fontSize = useFontSize();
  return (
    <View
      onLayout={onLayout}
      sx={{
        width: [null, width],
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        sx={{
          width: ["60%", "40%"],
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          py: "$2",
          bg: "#daeef3",
        }}
      >
        <Text sx={{ fontSize: [fontSize(14), fontSize(11)], fontWeight: 600 }}>
          Sân khấu
        </Text>
      </View>
      <View sx={{ mt: "$3" }}>
        {area1.map((item, index) => {
          return (
            <SpecialArea
              key={index}
              data={item}
              style={{ marginTop: index > 0 ? 12 : 0 }}
            />
          );
        })}
      </View>
      <View sx={{ flexDirection: "row", mt: "$3" }}>
        {area2.map((item, index) => {
          return (
            <SeatArea
              key={index}
              style={{ marginLeft: index > 0 ? SPACE_BETWEEN_AREA : 0 }}
              data={item}
            />
          );
        })}
      </View>
      <View sx={{ flexDirection: "row", mt: "$3" }}>
        {area3.map((item, index) => {
          return (
            <SeatArea
              key={index}
              style={{ marginLeft: index > 0 ? SPACE_BETWEEN_AREA : 0 }}
              data={item}
            />
          );
        })}
      </View>
      <Notes data={notes} />
    </View>
  );
};

const NoteItem = ({ index, name, color, bgTitle }) => {
  const fontSize = useFontSize();
  return (
    <View
      key={index}
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "black",
      }}
    >
      <View
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          borderRightWidth: 1,
          borderRightColor: "black",
        }}
      >
        <Text sx={{ fontSize: [fontSize(14), fontSize(9)], fontWeight: 600 }}>
          {isNaN(index) ? index : index + 1}
        </Text>
      </View>
      <View
        sx={{
          flexGrow: 1,
          px: "$2",
          justifyContent: "center",
          flex: 1,
          py: "$2",
        }}
      >
        <Text
          sx={{
            fontSize: [fontSize(15), fontSize(9)],
            fontWeight: color ? 400 : 500,
          }}
        >
          {name}
        </Text>
      </View>
      <View
        sx={{
          bg: color,
          width: 120,
          justifyContent: "center",
          alignItems: "center",
          borderLeftWidth: 1,
          borderLeftColor: "black",
        }}
      >
        {!color && (
          <Text sx={{ fontSize: [fontSize(14), fontSize(9)], fontWeight: 600 }}>
            {bgTitle}
          </Text>
        )}
      </View>
    </View>
  );
};

const Notes = ({ data }) => {
  console.log("Notes.data", data);
  const { width } = useWindowDimensions();
  return (
    <View sx={{ width: [width, "40%"], mt: "$3", flex: 1 }}>
      <Text sx={{ fontStyle: "italic" }}>{"Ghi chú sơ đồ chỗ ngồi"}</Text>
      <View
        sx={{
          mt: "$2",
          borderWidth: 1,
          borderColor: "black",
        }}
      >
        <NoteItem
          index={"Thứ tự"}
          name={"Tên đơn vị"}
          bgTitle={"Màu tương ứng"}
        />
        {data?.map((item, index) => {
          return (
            <NoteItem
              key={index}
              index={index}
              name={item?.name}
              color={item?.color}
            />
          );
        })}
      </View>
    </View>
  );
};

export default function SeatMapsTQ(props) {
  const { onLayout, width: containerWidth } = useLayout();
  const scrollViewWidth = useRef(0);
  const scrollViewContentWidth = useRef(0);
  const scrollViewRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(ITEMS[0]);

  const onScrollViewLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }) => {
      scrollViewWidth.current = width;
    },
    []
  );

  const onScrollViewContentLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }) => {
      scrollViewContentWidth.current = width;
    },
    []
  );

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: (scrollViewContentWidth.current - scrollViewWidth.current) / 2,
        });
      }, 500);
    });

    return () => interactionPromise.cancel();
  }, []);

  return (
    <DefaultLayout onContainerLayout={onLayout} useFullScreen={true}>
      <View sx={{ py: "$3" }}>
        <SegmentedControl
          items={ITEMS}
          selectedItem={selectedItem}
          onSelected={(item) => setSelectedItem(item)}
        />
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          onLayout={onScrollViewLayout}
          sx={{
            mt: "$3",
            width: containerWidth,
          }}
        >
          <SeatAreas
            width={containerWidth}
            data={selectedItem.session}
            notes={selectedItem.notes}
            onLayout={onScrollViewContentLayout}
          />
        </ScrollView>
      </View>
    </DefaultLayout>
  );
}
