"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { X, Copy, Check } from "lucide-react";
import { highlight } from "sugar-high";

interface CodeExpandModalProps {
  code: string;
  language?: string;
  children: React.ReactNode;
}

export function CodeExpandModal({
  code,
  language = "text",
  children,
}: CodeExpandModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        document.body.classList.remove("modal-open");
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-left w-full hover:bg-neutral-50 transition-colors rounded-md p-2 -m-2 focus:outline-none"
      >
        {children}
      </button>

      {isOpen &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 animate-in fade-in duration-200"
            style={{ zIndex: 99999 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            <div className="relative w-full max-w-5xl max-h-[85vh] bg-background border border-border rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="h-4 w-px bg-border/80 mx-2" />
                  <span className="font-mono text-xs font-medium text-foreground/80">
                    {language.toUpperCase()}
                  </span>
                  <span className="text-foreground/40">•</span>
                  <span className="text-xs text-foreground/60">
                    {code.split("\n").length} lines
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-8 px-3 hover:bg-foreground/10 text-foreground/80 hover:text-foreground"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1.5" />
                        <span className="text-xs">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1.5" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 hover:bg-foreground/10 text-foreground/80 hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6 overflow-auto max-h-[calc(85vh-5rem)]">
                <pre className="text-sm leading-relaxed bg-muted/40 rounded-lg p-6 border border-border/60">
                  <code
                    className={cn("language-" + language)}
                    dangerouslySetInnerHTML={{ __html: highlight(code) }}
                  />
                </pre>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
