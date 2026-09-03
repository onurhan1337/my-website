export interface QuoteSegment {
  text: string;
  href?: string;
}

export type QuoteLine = QuoteSegment[];
export type QuoteStanza = QuoteLine[];

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function parseLine(line: string): QuoteLine {
  const segments: QuoteLine = [];
  let last = 0;

  LINK_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = LINK_RE.exec(line)) !== null) {
    const index = match.index;
    if (index > last) segments.push({ text: line.slice(last, index) });
    segments.push({ text: match[1], href: match[2] });
    last = index + match[0].length;
  }

  if (last < line.length) segments.push({ text: line.slice(last) });
  return segments;
}

/** Splits raw quote markdown into stanzas (blank-line separated) of lines. */
export function parseQuote(content: string): QuoteStanza[] {
  return content
    .trim()
    .split(/\n\s*\n/)
    .map((stanza) =>
      stanza
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map(parseLine)
    )
    .filter((stanza) => stanza.length > 0);
}

export function quoteToPlainText(content: string): string {
  return parseQuote(content)
    .map((stanza) =>
      stanza
        .map((line) => line.map((segment) => segment.text).join(""))
        .join("\n")
    )
    .join("\n\n");
}

export function quoteLines(content: string): string[] {
  return quoteToPlainText(content).split("\n").filter(Boolean);
}

export function quoteExcerpt(content: string, max = 160): string {
  const text = quoteToPlainText(content).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const kept = cut.slice(0, lastSpace > 40 ? lastSpace : max);
  return `${kept.replace(/[\s.,:;·—-]+$/, "")}…`;
}

export type QuoteScale = "xl" | "lg" | "md";

/**
 * Picks the display size for a quote. Short lines get to be loud; a long
 * stanza block has to stay readable, so it steps down instead of wrapping.
 */
export function quoteScale(content: string): QuoteScale {
  const lines = quoteLines(content);
  const longest = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const total = lines.reduce((sum, line) => sum + line.length, 0);

  if (lines.length <= 3 && longest <= 34) return "xl";
  if (lines.length <= 8 && longest <= 52 && total <= 260) return "lg";
  return "md";
}
