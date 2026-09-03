import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getThought, getThoughts } from "@/app/db/thoughts";
import { QuoteText } from "@/components/quote-text";
import { ShareQuote } from "@/components/share-quote";
import { WaxSeal } from "@/components/wax-seal";
import {
  parseQuote,
  quoteExcerpt,
  quoteScale,
  quoteToPlainText,
} from "@/lib/quotes";

/** One measure per length, so a quote fills its column instead of wrapping. */
const QUOTE_TYPE = {
  xl: "tracking-[-0.02em] text-[clamp(1.5rem,4.4vw,2rem)] leading-[1.2] text-balance",
  lg: "tracking-[-0.015em] text-[clamp(1.375rem,3.6vw,1.625rem)] leading-[1.26] text-balance",
  md: "tracking-[-0.01em] text-[clamp(1.125rem,2.6vw,1.25rem)] leading-[1.45]",
} as const;

export const dynamic = "force-static";
export const dynamicParams = false;

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://onurhan.dev";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getQuote(slug: string) {
  const thought = await getThought(slug);
  if (!thought || thought.metadata.type !== "quote") return null;
  return thought;
}

export async function generateStaticParams() {
  const thoughts = await getThoughts();
  return thoughts
    .filter((thought) => thought.metadata.type === "quote")
    .map((thought) => ({ slug: thought.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { slug } = await params;
  const quote = await getQuote(slug);
  if (!quote) return;

  const title = quote.metadata.title ?? quoteExcerpt(quote.content, 60);
  const description = quoteExcerpt(quote.content, 200);
  const url = `${BASE_URL}/thoughts/${quote.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: quote.metadata.createdAt,
      authors: ["Onurhan Demir"],
      url,
      siteName: "Onurhan Demir",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@onurhan1337",
      creator: "@onurhan1337",
    },
    alternates: {
      canonical: url,
    },
  };
}

/** The way a mail client stamps a message: weekday, date, time. */
function formatSent(createdAt: string): string {
  const date = new Date(createdAt);
  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${day} ${time}`;
}

function formatShort(createdAt: string): string {
  return new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="grid grid-cols-[3.25rem_1fr] gap-x-3">
      <span className="text-ink-3">{label}</span>
      <span className="text-ink-2">{children}</span>
    </p>
  );
}

export default async function QuotePage({ params }: Props) {
  const { slug } = await params;
  const quote = await getQuote(slug);

  if (!quote) {
    notFound();
  }

  const stanzas = parseQuote(quote.content);
  const scale = quoteScale(quote.content);
  const plainText = quoteToPlainText(quote.content);
  const plainStanzas = stanzas.map((stanza) =>
    stanza.map((line) => line.map((segment) => segment.text).join(""))
  );
  const url = `${BASE_URL}/thoughts/${quote.slug}`;
  const title = quote.metadata.title ?? quoteExcerpt(quote.content, 60);
  const author = quote.metadata.author ?? "Onurhan Demir";
  const signature = author.split(" ")[0];

  const quotationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quotation",
    text: plainText,
    url,
    datePublished: quote.metadata.createdAt,
    inLanguage: "tr-TR",
    creator: {
      "@type": "Person",
      name: author,
      ...(author === "Onurhan Demir" && { url: BASE_URL }),
    },
    ...(quote.metadata.source && { isBasedOn: quote.metadata.source }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quotationJsonLd) }}
      />

      <article>
        <h1 className="sr-only">{title}</h1>

        <header className="space-y-1 text-small">
          <Field label="From">{author}</Field>
          <Field label="Sent">
            <time dateTime={quote.metadata.createdAt}>
              {formatSent(quote.metadata.createdAt)}
            </time>
          </Field>
          {quote.metadata.title && (
            <Field label="Subject">{quote.metadata.title}</Field>
          )}
        </header>

        <div className="mt-12">
          <QuoteText
            stanzas={stanzas}
            className={scale === "xl" ? "gap-8" : "gap-7"}
            stanzaClassName={QUOTE_TYPE[scale]}
          />
        </div>

        <p className="mt-12 text-small text-ink-2">{signature}</p>

        <footer className="mt-12">
          <div className="flex items-center gap-6">
            <span className="h-px flex-1 bg-rule" />
            <WaxSeal seed={quote.slug} size={84} />
            <span className="h-px flex-1 bg-rule" />
          </div>

          <p className="mt-5 flex flex-wrap items-baseline justify-center gap-x-3 text-caption text-ink-3">
            <span className="text-ink-2">{author}</span>
            <span>·</span>
            <time dateTime={quote.metadata.createdAt}>
              {formatShort(quote.metadata.createdAt)}
            </time>
            {quote.metadata.source && (
              <>
                <span>·</span>
                <a
                  href={quote.metadata.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  Source
                </a>
              </>
            )}
          </p>

          <div className="mt-8">
            <ShareQuote
              url={url}
              text={plainText}
              title={title}
              stanzas={plainStanzas}
              author={author}
              date={formatShort(quote.metadata.createdAt)}
              slug={quote.slug}
            />
          </div>
        </footer>
      </article>
    </>
  );
}
