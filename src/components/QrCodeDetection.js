import React, { useRef, useCallback } from "react";
import { QrReader } from "react-qr-reader";
import HttpClient from "../httpClient";

export default function QrCodeDetection({ width, area }) {
  const VIDEO_WIDTH = width / 1.5;
  const VIDEO_HEIGHT = (VIDEO_WIDTH * 720) / 1080;
  const isProcessing = useRef(false);

  const onResult = useCallback(async (result, error) => {
    console.log("QrCodeDetection.result", result);
    if (!result || error || isProcessing.current) {
      return;
    }
    const { text } = result;
    isProcessing.current = true;
    try {
      const { success } =
        (await HttpClient.post({
          method:
            Number(area) === 2
              ? "/face/checkin-qrcode-1"
              : "/face/checkin-qrcode",
          body: { code: text, area },
        })) || {};
      console.log("QrCodeDetection.checkin-qrcode.success", success);
    } catch (error) {
      console.log("QrCodeDetection.checkin-qrcode.error", error);
    } finally {
      isProcessing.current = false;
    }
  }, []);

  return (
    <div
      style={{
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        alignSelf: "center",
      }}
    >
      <QrReader
        onResult={onResult}
        containerStyle={{ height: VIDEO_HEIGHT }}
        videoContainerStyle={{
          height: VIDEO_HEIGHT,
        }}
        videoStyle={{
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
        }}
      />
    </div>
  );
}
