import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const guidelineBaseWidth = 1920;
const guidelineBaseHeight = 1080;

export const scale = (size) => (width / guidelineBaseWidth) * size;

export const scaleFont = (fontSize) => {
  const widthPercent = Math.round((fontSize * width) / guidelineBaseWidth);
  return widthPercent > fontSize + 2 ? fontSize + 2 : widthPercent;
};

export const scaleFontVertical = (fontSize) => {
  const heightPercent = Math.round((fontSize * width) / guidelineBaseHeight);
  return heightPercent > fontSize + 2 ? fontSize + 2 : heightPercent;
};

export const convertCheckinData = (data, hasFace = true) => {
  const {
    id,
    aliasID,
    personName,
    personTitle,
    personType,
    mask,
    time,
    detected_image_url,
    face,
  } = data;
  return {
    id,
    attributes: {
      aliasID,
      detected_image_url,
      personName,
      personTitle,
      personType,
      mask,
      time,
      ...(hasFace &&
        face && {
          face: {
            data: {
              id: face.id,
              attributes: {
                avatar: {
                  data: {
                    attributes: {
                      url: face.url,
                      name: face.name,
                      title: face.title,
                    },
                  },
                },
              },
            },
          },
        }),
    },
  };
};

export const oddArrayNumberFromRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx)
    .filter((item) => item % 2 !== 0)
    .reverse();

export const evenArrayNumberFromRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx)
    .filter((item) => item % 2 === 0);
