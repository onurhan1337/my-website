import { SEAL_BLOB, SEAL_FACE, SEAL_MARK } from "@/components/wax-seal";

export interface QuoteImageInput {
  /** Source lines, already split the way the author wrote them. */
  stanzas: string[][];
  author: string;
  date: string;
  site?: string;
}

const WIDTH = 1080;
const HEIGHT = 1350;
const PAD = 96;
const INK = "#1d1d1f";
const INK_2 = "#6e6e73";
const INK_3 = "#a1a1a6";
const RULE = "#e8e8ed";
const PAPER = "#ffffff";

const FONT_STACK = '"Inter Variable", Inter, -apple-system, system-ui, sans-serif';

interface Laid {
  size: number;
  leading: number;
  stanzaGap: number;
  blocks: string[][];
  height: number;
}

function setFont(ctx: CanvasRenderingContext2D, size: number, weight = 400) {
  ctx.font = `${weight} ${size}px ${FONT_STACK}`;
}

/** Wraps one authored line, keeping the author's own breaks as hard breaks. */
function wrap(
  ctx: CanvasRenderingContext2D,
  line: string,
  maxWidth: number
): string[] {
  if (ctx.measureText(line).width <= maxWidth) return [line];

  const words = line.split(" ");
  const out: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth || !current) {
      current = next;
    } else {
      out.push(current);
      current = word;
    }
  }
  if (current) out.push(current);
  return out;
}

/** Steps the type down until the whole quote fits the plate. */
function layout(
  ctx: CanvasRenderingContext2D,
  stanzas: string[][],
  maxWidth: number,
  maxHeight: number
): Laid {
  const sizes = [84, 76, 68, 62, 56, 50, 45, 41, 37, 34, 31, 28];

  for (const size of sizes) {
    setFont(ctx, size);
    const leading = Math.round(size * 1.22);
    const stanzaGap = Math.round(size * 0.78);

    const blocks = stanzas.map((stanza) =>
      stanza.flatMap((line) => wrap(ctx, line, maxWidth))
    );
    const lineCount = blocks.reduce((sum, block) => sum + block.length, 0);
    const height =
      lineCount * leading + Math.max(0, blocks.length - 1) * stanzaGap;

    if (height <= maxHeight || size === sizes[sizes.length - 1]) {
      return { size, leading, stanzaGap, blocks, height };
    }
  }

  throw new Error("unreachable");
}

function drawSeal(ctx: CanvasRenderingContext2D, cx: number, cy: number, d: number) {
  const scale = d / 100;
  ctx.save();
  ctx.translate(cx - d / 2, cy - d / 2);
  ctx.scale(scale, scale);

  const blob = new Path2D(SEAL_BLOB);
  const face = new Path2D(SEAL_FACE);
  const mark = new Path2D(SEAL_MARK);

  const rim = ctx.createLinearGradient(20, 6, 80, 94);
  rim.addColorStop(0, "#3fb3a9");
  rim.addColorStop(0.34, "#158b83");
  rim.addColorStop(0.7, "#0e6b65");
  rim.addColorStop(1, "#083f3c");

  // the spread wax, sitting on the paper
  ctx.save();
  ctx.shadowColor = "rgba(5, 46, 44, 0.3)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 5;
  ctx.fillStyle = rim;
  ctx.fill(blob);
  ctx.restore();

  // the rounded rim: lit crest above, dark underside below
  ctx.save();
  ctx.clip(blob);
  ctx.filter = "blur(2px)";
  ctx.save();
  ctx.translate(-1.4, -1.8);
  ctx.strokeStyle = "rgba(99, 205, 196, 0.55)";
  ctx.lineWidth = 3;
  ctx.stroke(blob);
  ctx.restore();
  ctx.save();
  ctx.translate(1.8, 2.2);
  ctx.strokeStyle = "rgba(5, 47, 45, 0.6)";
  ctx.lineWidth = 5;
  ctx.stroke(blob);
  ctx.restore();
  ctx.strokeStyle = "rgba(7, 64, 61, 0.35)";
  ctx.lineWidth = 6;
  ctx.stroke(blob);
  ctx.filter = "none";
  ctx.restore();

  // the pressed face, sunk below the rim
  const faceFill = ctx.createRadialGradient(36, 30, 4, 50, 50, 62);
  faceFill.addColorStop(0, "#12857e");
  faceFill.addColorStop(0.52, "#0d6d67");
  faceFill.addColorStop(1, "#08514d");

  ctx.save();
  ctx.shadowColor = "rgba(4, 37, 35, 0.65)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = -2;
  ctx.shadowOffsetY = -3;
  ctx.fillStyle = faceFill;
  ctx.fill(face);
  ctx.restore();

  ctx.save();
  ctx.clip(face);

  ctx.save();
  ctx.filter = "blur(2px)";
  ctx.translate(1.2, 1.8);
  ctx.strokeStyle = "rgba(125, 219, 210, 0.4)";
  ctx.lineWidth = 2.4;
  ctx.stroke(face);
  ctx.restore();

  ctx.beginPath();
  ctx.arc(50, 50, 30, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(6, 55, 53, 0.75)";
  ctx.lineWidth = 2.4;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(50, 51.4, 30, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(111, 212, 203, 0.35)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = "rgba(6, 55, 53, 0.6)";
  for (const x of [18.5, 81.5]) {
    ctx.beginPath();
    ctx.arc(x, 47, 1.7, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(1.4, 2);
  ctx.fillStyle = "rgba(143, 228, 220, 0.55)";
  ctx.fill(mark);
  ctx.restore();

  ctx.save();
  ctx.translate(-1.2, -1.6);
  ctx.fillStyle = "rgba(3, 33, 31, 0.85)";
  ctx.fill(mark);
  ctx.restore();

  ctx.fillStyle = "#0d716b";
  ctx.fill(mark);

  const sheen = ctx.createLinearGradient(22, 10, 76, 90);
  sheen.addColorStop(0, "rgba(255,255,255,0.22)");
  sheen.addColorStop(0.45, "rgba(255,255,255,0.03)");
  sheen.addColorStop(1, "rgba(3,34,32,0.26)");
  ctx.fillStyle = sheen;
  ctx.fill(face);

  ctx.restore();
  ctx.restore();
}

/**
 * Renders the quote as a square plate: the words, a rule, the seal, the
 * attribution. Same composition as the page, so the picture and the page
 * are recognisably the same object.
 */
export async function renderQuoteImage(
  input: QuoteImageInput
): Promise<Blob> {
  const dpr = 2;
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH * dpr;
  canvas.height = HEIGHT * dpr;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  ctx.scale(dpr, dpr);

  if (document.fonts?.ready) {
    await document.fonts.load(`500 76px ${FONT_STACK}`).catch(() => {});
    await document.fonts.ready;
  }

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const maxWidth = WIDTH - PAD * 2;
  const footerHeight = 230;
  const bodyHeight = HEIGHT - PAD * 2 - footerHeight;
  const laid = layout(ctx, input.stanzas, maxWidth, bodyHeight);

  // Centred in the space above the seal, never crowding it.
  const top = Math.max(PAD, PAD + (bodyHeight - laid.height) / 2);

  ctx.fillStyle = INK;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  setFont(ctx, laid.size);

  let y = top + laid.size;
  laid.blocks.forEach((block, index) => {
    for (const line of block) {
      ctx.fillText(line, PAD, y);
      y += laid.leading;
    }
    if (index < laid.blocks.length - 1) y += laid.stanzaGap;
  });

  const sealY = HEIGHT - PAD - 104;
  const sealSize = 88;

  ctx.strokeStyle = RULE;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, sealY);
  ctx.lineTo(WIDTH / 2 - sealSize / 2 - 26, sealY);
  ctx.moveTo(WIDTH / 2 + sealSize / 2 + 26, sealY);
  ctx.lineTo(WIDTH - PAD, sealY);
  ctx.stroke();

  drawSeal(ctx, WIDTH / 2, sealY, sealSize);

  ctx.textAlign = "center";
  setFont(ctx, 24, 400);
  ctx.fillStyle = INK_2;
  ctx.fillText(`${input.author}   ·   ${input.date}`, WIDTH / 2, sealY + 98);

  setFont(ctx, 22, 400);
  ctx.fillStyle = INK_3;
  ctx.fillText(input.site ?? "onurhan.dev", WIDTH / 2, sealY + 138);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not encode the image"));
    }, "image/png");
  });
}
