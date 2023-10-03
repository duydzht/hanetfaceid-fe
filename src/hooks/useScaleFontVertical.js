import { useWindowDimensions } from "react-native";

const guidelineBaseHeight = 1080;

export function useScaleFontVertical(fontSize) {
  const { width } = useWindowDimensions();
  const heightPercent = Math.round((fontSize * width) / guidelineBaseHeight);
  return heightPercent > fontSize + 2 ? fontSize + 2 : heightPercent;
}
