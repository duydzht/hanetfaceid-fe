import React, { useState, useEffect } from "react";
import { Image } from "react-native";

export default function AspectRatioImage({ uri, aspectWidth, style }) {
  const [imageSize, setImageSize] = useState({});
  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      console.log("");
      setImageSize({ width, height });
    });
  }, [uri]);

  if (!uri || !imageSize.width || !imageSize.height || !aspectWidth) {
    return null;
  }

  const imageStyle = {
    width: aspectWidth,
    height: (aspectWidth * imageSize.height) / imageSize.width,
    ...style,
  };

  return <Image source={{ uri }} resizeMode={"contain"} style={imageStyle} />;
}
