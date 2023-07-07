"use client";

import QRCode from "react-qr-code";

interface Props {
  joinCode: string;
}

export const QrCode: React.FC<Props> = ({ joinCode }) => {
  const url = location.origin + "/game/" + joinCode;
  return (
    <div
      style={{
        height: "auto",
        margin: "0 auto",
        maxWidth: 128,
        width: "100%",
        background: "white",
        padding: "16px",
        marginTop: "16px",
        marginBottom: "16px",
      }}
    >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={url}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};
