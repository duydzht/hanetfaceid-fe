import { PixelRatio, useWindowDimensions } from "react-native";

const pixelDensity = PixelRatio.get();

export const useFontSize = () => {
  const { width: W, height: H } = useWindowDimensions();

  const density = pixelDensity * 160;
  const x = Math.pow((W * pixelDensity) / density, 2);
  const y = Math.pow((H * pixelDensity) / density, 2);
  const screenInches = Math.sqrt(x + y) + 1.6;

  const scale = (number) => {
    const ratio = (screenInches + pixelDensity) / 10;
    const value = number * Number(ratio.toFixed(1));
    return Number(value.toFixed(1));
  };

  return scale;
};
