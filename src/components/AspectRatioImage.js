import React, { useState, useEffect } from "react";
import { Image } from "react-native";

export default function AspectRatioImage({
  uri,
  aspectWidth,
  aspectHeight,
  style,
}) {
  const [imageSize, setImageSize] = useState({});
  useEffect(() => {
    if (typeof uri === "string") {
      Image.getSize(uri, (width, height) => {
        setImageSize({ width, height });
      });
    } else {
      const { width, height } = Image.resolveAssetSource(uri);
      setImageSize({ width, height });
    }
  }, [uri]);

  if (
    !uri ||
    !imageSize.width ||
    !imageSize.height ||
    (!aspectWidth && !aspectHeight)
  ) {
    return null;
  }

  const imageStyle = aspectWidth
    ? {
        width: aspectWidth,
        height: (aspectWidth * imageSize.height) / imageSize.width,
        ...style,
      }
    : {
        width: (aspectHeight * imageSize.width) / imageSize.height,
        height: aspectHeight,
        ...style,
      };

  return <Image source={{ uri }} resizeMode={"contain"} style={imageStyle} />;
}
