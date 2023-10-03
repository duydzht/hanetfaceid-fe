import React from "react";
import { useWindowDimensions } from "react-native";
import Iframe from "react-iframe";

export default function Document(props) {
  const { width, height } = useWindowDimensions();
  React.useEffect(() => {
    console.log("Document.width", width);
  }, [width, height]);
  return (
    <Iframe
      url="https://fliphtml5.com/bookcase/eqyxd"
      position="absolute"
      width={width}
      height={height}
    />
  );
}
