"use client";

import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface BrowserFrameProps {
  url: string;
  title?: string;
}

export function BrowserFrame({ url, title }: BrowserFrameProps) {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.screenshot?.url) {
          setScreenshotUrl(data.data.screenshot.url);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [url]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-foreground/10 overflow-hidden bg-foreground/[0.02] hover:border-foreground/20 transition-colors group"
    >
      <div className="flex items-center gap-2 px-4 h-10 border-b border-foreground/10 bg-foreground/[0.04]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-foreground/5 text-[13px] text-foreground/50 truncate max-w-[90%]">
            <ExternalLink size={12} className="shrink-0" />
            <span className="truncate">{url}</span>
          </div>
        </div>
        <div className="w-[4.5rem]" />
      </div>
      <div className="relative w-full bg-foreground/[0.03]" style={{ aspectRatio: "16/10" }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-foreground/20 border-t-foreground/50 rounded-full animate-spin" />
          </div>
        )}
        {screenshotUrl && (
          <Image
            src={screenshotUrl}
            alt={`Screenshot of ${title || url}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 672px"
            unoptimized
          />
        )}
        {!loading && !screenshotUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-[13px] text-foreground/30">
            Preview unavailable
          </div>
        )}
      </div>
    </a>
  );
}
