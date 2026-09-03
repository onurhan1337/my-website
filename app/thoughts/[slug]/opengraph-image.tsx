import { ImageResponse } from "next/og";
import { getThought, getThoughts } from "@/app/db/thoughts";
import { parseQuote } from "@/lib/quotes";

export const dynamic = "force-static";
export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Quote by Onurhan Demir";

const MAX_LINES = 8;

export async function generateStaticParams() {
  const thoughts = await getThoughts();
  return thoughts
    .filter((thought) => thought.metadata.type === "quote")
    .map((thought) => ({ slug: thought.slug }));
}

function fontSizeFor(lines: string[]): number {
  const chars = lines.join(" ").length;
  const longest = Math.max(...lines.map((line) => line.length), 1);
  if (lines.length > 7 || chars > 320 || longest > 60) return 34;
  if (lines.length > 4 || chars > 160 || longest > 40) return 44;
  return 60;
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thought = await getThought(slug);
  const author = thought?.metadata.author ?? "Onurhan Demir";

  const allStanzas = thought
    ? parseQuote(thought.content).map((stanza) =>
        stanza.map((line) => line.map((segment) => segment.text).join(""))
      )
    : [["Onurhan Demir"]];

  const stanzas: string[][] = [];
  let lineCount = 0;
  for (const stanza of allStanzas) {
    if (lineCount + stanza.length > MAX_LINES && stanzas.length > 0) break;
    stanzas.push(stanza);
    lineCount += stanza.length;
  }
  const truncated = stanzas.length < allStanzas.length;
  const lines = stanzas.flat();
  const fontSize = fontSizeFor(lines);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          padding: "72px 88px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "88px",
            fontSize: "20px",
            opacity: 0.5,
          }}
        >
          onurhan.dev
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
            maxWidth: "1024px",
          }}
        >
          {stanzas.map((stanza, stanzaIndex) => (
            <div
              key={stanzaIndex}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: stanzaIndex < stanzas.length - 1 ? 22 : 0,
              }}
            >
              {stanza.map((line, lineIndex) => (
                <span key={lineIndex}>{line}</span>
              ))}
            </div>
          ))}
          {truncated && <span style={{ opacity: 0.4, marginTop: 12 }}>…</span>}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "88px",
            fontSize: "22px",
            opacity: 0.6,
            letterSpacing: "0.04em",
          }}
        >
          {`— ${author}`}
        </div>
      </div>
    ),
    size
  );
}
