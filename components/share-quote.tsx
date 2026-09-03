"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { renderQuoteImage } from "@/lib/quote-image";

interface ShareQuoteProps {
  url: string;
  text: string;
  title: string;
  stanzas: string[][];
  author: string;
  date: string;
  slug: string;
}

const X_LIMIT = 240;

function trimForX(text: string): string {
  const flat = text.replace(/\n{2,}/g, "\n").trim();
  if (flat.length <= X_LIMIT) return flat;
  const cut = flat.slice(0, X_LIMIT);
  const lastBreak = Math.max(cut.lastIndexOf("\n"), cut.lastIndexOf(". "));
  return `${cut.slice(0, lastBreak > 80 ? lastBreak + 1 : X_LIMIT).trim()}…`;
}

function Action({
  onClick,
  href,
  children,
  active,
}: {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  const className = cn(
    "transition-colors duration-150",
    active ? "text-ink" : "text-ink-2 hover:text-ink"
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function ShareQuote({
  url,
  text,
  title,
  stanzas,
  author,
  date,
  slug,
}: ShareQuoteProps) {
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  const flash = useCallback((message: string) => {
    setNote(message);
    setTimeout(() => setNote(null), 1800);
  }, []);

  const copy = useCallback(
    async (value: string, message: string) => {
      try {
        await navigator.clipboard.writeText(value);
        flash(message);
      } catch {
        flash("Copy failed");
      }
    },
    [flash]
  );

  const saveImage = useCallback(async () => {
    setBusy(true);
    try {
      const blob = await renderQuoteImage({ stanzas, author, date });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${slug}.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 4000);
      flash("Image saved");
    } catch {
      flash("Could not make the image");
    } finally {
      setBusy(false);
    }
  }, [stanzas, author, date, slug, flash]);

  const copyImage = useCallback(async () => {
    setBusy(true);
    try {
      const blob = await renderQuoteImage({ stanzas, author, date });
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      flash("Image copied");
    } catch {
      flash("Copy failed");
    } finally {
      setBusy(false);
    }
  }, [stanzas, author, date, flash]);

  const xHref = `https://x.com/intent/post?${new URLSearchParams({
    text: `${trimForX(text)}\n\n— @onurhan1337`,
    url,
  }).toString()}`;

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams(
    { url }
  ).toString()}`;

  return (
    <div id="share" className="scroll-mt-24 text-small">
      <div className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2">
        <Action href={xHref}>X</Action>
        <Action href={linkedInHref}>LinkedIn</Action>
        <Action onClick={() => copy(url, "Link copied")}>Copy link</Action>
        <Action
          onClick={() => copy(`${text}\n\n— ${author}\n${url}`, "Text copied")}
        >
          Copy text
        </Action>
        <Action onClick={saveImage}>{busy ? "Rendering" : "Save image"}</Action>
        <Action onClick={copyImage}>Copy image</Action>
        {canNativeShare && (
          <Action
            onClick={() => {
              navigator.share({ title, text, url }).catch(() => {});
            }}
          >
            More
          </Action>
        )}
      </div>

      <p
        aria-live="polite"
        className={cn(
          "mt-3 text-center text-caption transition-opacity duration-200",
          note ? "text-ink-3 opacity-100" : "opacity-0"
        )}
      >
        {note ?? " "}
      </p>
    </div>
  );
}
