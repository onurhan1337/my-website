import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    if (!title) {
      return new Response("Missing title parameter", { status: 400 });
    }

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
            <img
              src={new URL(
                "/logo.svg",
                process.env.NEXT_PUBLIC_APP_URL
              ).toString()}
              width={24}
              height={24}
              alt="Logo"
              style={{
                objectFit: "contain",
              }}
            />
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
                fontSize: "48px",
                fontWeight: 700,
                color: "#a7f3d0",
                lineHeight: 1.2,
                textAlign: "center",
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    });
  }
}
