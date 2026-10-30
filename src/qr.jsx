import React from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCode({ value, size = 180 }) {
  if (!value) return null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        padding: 8,
        borderRadius: 10,
        border: "2px solid #cbd5e1",
      }}
    >
      <QRCodeSVG
        value={value}
        size={size}
        level="H"
        includeMargin
        bgColor="#ffffff"
        fgColor="#0f172a"
        title={`Scan to open ${value}`}
      />
    </div>
  );
}
