"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { highlight } from "sugar-high";
import type { CodeExpandModalProps } from "@/types";

export function CodeExpandModal({ code, children }: CodeExpandModalProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="block w-full text-left">
        {children}
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 fade-in">
            <div
              className="absolute inset-0 bg-paper/90"
              onClick={() => setOpen(false)}
            />
            <div className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-md bg-well">
              <div className="flex items-center justify-end gap-5 px-6 pt-4 text-caption">
                <button type="button" onClick={copy} className="link">
                  {copied ? "Copied" : "Copy"}
                </button>
                <button type="button" onClick={() => setOpen(false)} className="link">
                  Close
                </button>
              </div>
              <pre className="overflow-auto px-6 pb-6 pt-2 font-mono text-caption leading-6">
                <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
              </pre>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
