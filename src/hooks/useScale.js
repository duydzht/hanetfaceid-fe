import { useWindowDimensions } from "react-native";

const guidelineBaseWidth = 1920;

export function useScale(size) {
  const { width } = useWindowDimensions();
  return (width / guidelineBaseWidth) * size;
}
