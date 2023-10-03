import { Text, View, Pressable } from "dripsy";
import findIndex from "lodash/findIndex";

export default function SegmentedControl({ items, selectedItem, onSelected }) {
  const selectedIndex = findIndex(items, { value: selectedItem.value });
  return (
    <View
      sx={{
        flexDirection: "row",
        height: 40,
        borderWidth: 1,
        borderColor: "$primary",
        borderRadius: 4,
        alignSelf: "center",
      }}
    >
      {items.map((item, index) => {
        const { name, value, session } = item;
        const isSelected = index === selectedIndex;
        return (
          <Pressable
            key={index}
            onPress={() => onSelected(item)}
            sx={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              ...(isSelected && {
                bg: "$primary",
              }),
              ...(index > 0 && {
                borderLeftWidth: 0.5,
                borderLeftColor: "black",
              }),
              px: "$3",
              minWidth: 120,
            }}
          >
            <Text
              sx={{
                color: "$text",
                fontSize: 13,
                fontWeight: "600",
                ...(isSelected && {
                  color: "$white",
                }),
                textAlign: "center",
              }}
            >
              {name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
