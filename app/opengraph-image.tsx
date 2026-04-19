import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Onurhan Demir - Software Developer";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "32px",
            right: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            onurhan.dev
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 48px",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#a7f3d0",
              lineHeight: 1.2,
              textAlign: "center",
              margin: 0,
            }}
          >
            Onurhan Demir
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "white",
              opacity: 0.7,
              marginTop: "16px",
            }}
          >
            Software Developer
          </p>
        </div>
      </div>
    ),
    size
  );
}
