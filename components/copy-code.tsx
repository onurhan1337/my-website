"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";

interface CopyCodeProps {
  children: React.ReactNode;
  code?: string;
  className?: string;
}

export function CopyCode({ children, code, className }: CopyCodeProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, [code]);

  return (
    <div className={cn("relative group", className)}>
      <div className="absolute right-2 top-2 z-20">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            "bg-zinc-100/80 backdrop-blur-sm",
            "hover:bg-zinc-200/80",
            "opacity-0 group-hover:opacity-100 transition-all duration-200",
            "border border-zinc-200"
          )}
          onClick={copyToClipboard}
          title={isCopied ? "Copied!" : "Copy code"}
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4 text-zinc-600" />
          )}
          <span className="sr-only">{isCopied ? "Copied!" : "Copy code"}</span>
        </Button>
      </div>
      {children}
    </div>
  );
}
