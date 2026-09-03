"use client";

import { CodeExpandModal } from "./code-expand-modal";
import { highlight } from "sugar-high";
import type { ExpandableCodeProps } from "@/types";

const PREVIEW_LINES = 10;

export function ExpandableCode({
  children,
  className,
  code,
  ...props
}: ExpandableCodeProps) {
  const content = code || children?.toString() || "";
  const lines = content.split("\n");

  if (lines.length <= PREVIEW_LINES) {
    if (code) return <>{children}</>;
    return (
      <pre>
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: highlight(content) }}
          {...props}
        />
      </pre>
    );
  }

  const preview = highlight(lines.slice(0, PREVIEW_LINES).join("\n"));

  return (
    <CodeExpandModal code={content}>
      <div className="group relative">
        <pre className="pb-12">
          <code className={className} dangerouslySetInnerHTML={{ __html: preview }} {...props} />
        </pre>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-b-md bg-gradient-to-t from-well to-transparent" />
        <span className="absolute bottom-4 left-6 text-caption text-ink-2 transition-colors group-hover:text-ink">
          Show all {lines.length} lines
        </span>
      </div>
    </CodeExpandModal>
  );
}
