import React, { useRef, useCallback } from "react";
import { QrReader } from "react-qr-reader";
import HttpClient from "../httpClient";

export default function QrCodeDetection({ width }) {
  const VIDEO_WIDTH = width / 1.5;
  const VIDEO_HEIGHT = (VIDEO_WIDTH * 720) / 1080;
  const isProcessing = useRef(false);

  const onResult = useCallback(async (result, error) => {
    console.log("QrCodeDetection.result", result);
    if (!result || error || isProcessing.current) {
      return;
    }

    const { text } = result;

    if (/^0([0-9]{9})$/.test(text)) {
      isProcessing.current = true;
      try {
        const { success } =
          (await HttpClient.post({
            method: "/face/checkin-qrcode",
            body: { phone: text },
          })) || {};
        console.log("QrCodeDetection.checkin-qrcode.success", success);
      } catch (error) {
        console.log("QrCodeDetection.checkin-qrcode.error", error);
      } finally {
        isProcessing.current = false;
      }
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
