import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "iCLUB Store - iPhones verificados al mejor precio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#c462ab",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#c462ab",
          }}
        />
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#1e293b",
            marginBottom: 16,
          }}
        >
          iCLUBstore
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#64748b",
            marginBottom: 24,
          }}
        >
          iPhones verificados al mejor precio
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#c462ab",
            display: "flex",
            gap: 16,
          }}
        >
          <span>Bateria al 100%</span>
          <span>·</span>
          <span>Garantia 30 dias</span>
          <span>·</span>
          <span>Entrega en el dia</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
