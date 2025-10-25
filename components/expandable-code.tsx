"use client";

import { CodeExpandModal } from "./code-expand-modal";
import { cn } from "@/lib/utils";
import { highlight } from "sugar-high";

interface ExpandableCodeProps {
  children: React.ReactNode;
  className?: string;
  code?: string;
  [key: string]: unknown;
}

export function ExpandableCode({
  children,
  className,
  code,
  ...props
}: ExpandableCodeProps) {
  const language = className?.replace(/language-/, "") || "text";
  const codeContent = code || children?.toString() || "";
  const lines = codeContent.split("\n");
  const isLongCode = lines.length > 10;

  if (!isLongCode) {
    if (code) {
      return <>{children}</>;
    }
    const codeHTML = highlight(codeContent);
    return (
      <pre className="!border-none">
        <code
          className={cn("language-" + language, className)}
          dangerouslySetInnerHTML={{ __html: codeHTML }}
          {...props}
        />
      </pre>
    );
  }

  const previewCode = lines.slice(0, 10).join("\n");
  const previewHTML = highlight(previewCode);

  return (
    <CodeExpandModal code={codeContent} language={language}>
      <div className="group relative cursor-pointer bg-zinc-50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
        <pre className="!border-none p-4 pb-14">
          <code
            className={cn("language-" + language, className)}
            dangerouslySetInnerHTML={{ __html: previewHTML }}
            {...props}
          />
        </pre>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-50 to-transparent pointer-events-none" />

        <div className="absolute bottom-3 right-3">
          <div className="bg-stone-500 backdrop-blur-sm text-background rounded-full p-2 shadow-xl group-hover:bg-foreground transition-all duration-300">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </div>
        </div>
      </div>
    </CodeExpandModal>
  );
}
