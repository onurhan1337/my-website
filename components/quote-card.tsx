import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { parseQuote } from "@/lib/quotes";
import { QuoteText } from "@/components/quote-text";
import type { ThoughtPost } from "@/types/thought";

const PREVIEW_LINES = 4;

export function QuoteCard({ thought }: { thought: ThoughtPost }) {
  const stanzas = parseQuote(thought.content);
  const totalLines = stanzas.reduce((sum, stanza) => sum + stanza.length, 0);

  const preview: typeof stanzas = [];
  let taken = 0;
  for (const stanza of stanzas) {
    if (taken >= PREVIEW_LINES) break;
    const slice = stanza.slice(0, PREVIEW_LINES - taken);
    preview.push(slice);
    taken += slice.length;
  }
  const truncated = totalLines > taken;
  const href = `/thoughts/${thought.slug}`;

  return (
    <article className="py-10 first:pt-0">
      <p className="mb-4 text-caption text-ink-3">
        <span>Quote</span>
        <span className="mx-2">·</span>
        <time dateTime={thought.metadata.createdAt}>
          {formatDate(thought.metadata.createdAt, { time: true })}
        </time>
      </p>

      <Link href={href} className="block link-ink">
        <QuoteText
          stanzas={preview}
          className="gap-4"
          stanzaClassName="text-lead font-medium"
        />
        {truncated && (
          <span className="mt-3 block text-caption text-ink-3">
            Read the rest
          </span>
        )}
      </Link>
    </article>
  );
}
