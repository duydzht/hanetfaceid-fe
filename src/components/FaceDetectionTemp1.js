import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { scale, scaleFont, scaleFontVertical } from "../utils";
import Colors from "../colors";
import get from "lodash/get";

import { Camera } from "@mediapipe/camera_utils";
import drawingUtils from "@mediapipe/drawing_utils";
import { FaceDetection as FaceDetect } from "@mediapipe/face_detection";

const faceDetection = new FaceDetect({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`;
  },
});

faceDetection.setOptions({
  model: "short",
  selfieMode: true,
  minDetectionConfidence: 0.5,
});

export default function FaceDetectionTemp1({ height, width, checkinData }) {
  const [videoElement, setVideoElement] = useState(null);
  const [canvasElement, setCanvasElement] = useState(null);
  const [canvasContext, setCanvasContext] = useState(null);

  useEffect(() => {
    console.log("canvasElement", canvasElement);
    if (canvasElement) {
      setCanvasContext(canvasElement.getContext("2d"));
    }
  }, [canvasElement]);

  useEffect(() => {
    console.log("canvasContext", canvasContext);
  }, [canvasContext]);

  const videoRef = useCallback(
    (node) => {
      if (node !== null && !videoElement) {
        setVideoElement(node);
      }
    },
    [videoElement]
  );

  useEffect(() => {
    faceDetection.onResults(onResults);
  }, [onResults, canvasElement, canvasContext]);

  const VIDEO_WIDTH = width / 1.5;
  const VIDEO_HEIGHT = (VIDEO_WIDTH * 720) / 1080;

  const onResults = useCallback(
    (results) => {
      console.log("onResults.canvasElement", canvasElement);
      console.log("onResults.canvasContext", canvasContext);
      if (canvasElement && canvasContext) {
        canvasContext.save();
        canvasContext.clearRect(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        canvasContext.drawImage(
          results.image,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        if (results.detections.length > 0) {
          drawingUtils.drawRectangle(
            canvasContext,
            results.detections[0].boundingBox,
            {
              color: "#0970f2",
              lineWidth: 1,
              fillColor: "#00000000",
            }
          );
        }
        canvasContext.restore();
      }
    },
    [canvasContext, canvasElement]
  );

  useEffect(() => {
    if (videoElement) {
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await faceDetection.send({ image: videoElement });
        },
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
      });
      camera.start();
    }
  }, [videoElement]);

  const canvasRef = useCallback(
    (node) => {
      console.log("canvasRef.node", node);
      if (node !== null && !canvasElement) {
        setCanvasElement(node);
      }
    },
    [canvasElement]
  );

  if (!checkinData) {
    return (
      <div
        style={{
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
          alignSelf: "center",
        }}
      >
        <video
          ref={videoRef}
          style={{
            display: "none",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: scale(-1, 1),
          }}
        />
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <canvas
            style={{
              maxWidth: "100%",
              display: "block",
              position: "relative",
              left: 0,
              top: 0,
            }}
            ref={canvasRef}
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
          />
        </div>
      </div>
    );
  }

  return (
    <View
      style={{
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        backgroundColor: "#F5F5F6",
        marginVertical: scale(16),
        borderRadius: scale(8),
        alignSelf: "center",
      }}
    >
      <Image
        resizeMode="contain"
        source={{
          uri: get(checkinData, "detected_image_url", ""),
        }}
        style={{ width: "100%", height: "100%", borderRadius: scale(8) }}
      />
    </View>
  );
}
