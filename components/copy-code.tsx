"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import type { CopyCodeProps } from "@/types";

export function CopyCode({ children, code, className }: CopyCodeProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Copy failed", error);
    }
  }, [code]);

  return (
    <div className={cn("group relative", className)}>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "absolute right-3 top-3 text-caption transition-opacity duration-150",
          copied ? "text-ink" : "text-ink-2 opacity-0 hover:text-ink group-hover:opacity-100"
        )}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      {children}
    </div>
  );
}
