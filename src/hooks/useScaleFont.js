import { useWindowDimensions } from "react-native";

const guidelineBaseWidth = 1920;

export function useScaleFont(fontSize) {
  const { width } = useWindowDimensions();
  const widthPercent = Math.round((fontSize * width) / guidelineBaseWidth);
  return widthPercent > fontSize + 2 ? fontSize + 2 : widthPercent;
}
