import React from "react";
import { formatDate } from "@/lib/utils";
import type { ThoughtCardProps } from "@/types";

const typeLabels = {
  code: "CODE",
  idea: "IDEA",
  quote: "QUOTE",
  book: "BOOK",
};

export const ThoughtCard = React.memo(
  ({ thought }: ThoughtCardProps) => {
    const { type, createdAt } = thought.metadata;

    return (
      <article className="py-8 first:pt-0 border-b border-foreground/10 last:border-0 focus:outline-none">
        <header className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs tracking-wider opacity-40 uppercase">
              {typeLabels[type]}
            </span>
            <time className="text-xs tracking-wider opacity-40">
              {formatDate(createdAt, { time: true })}
            </time>
          </div>
        </header>

        <div className="thoughts-prose prose prose-sm prose-neutral max-w-none text-[15px] leading-relaxed opacity-85">
          {thought.renderedContent}
        </div>
      </article>
    );
  },
  (prev, next) =>
    prev.thought.slug === next.thought.slug &&
    prev.thought.metadata.createdAt === next.thought.metadata.createdAt &&
    prev.thought.metadata.type === next.thought.metadata.type
);

ThoughtCard.displayName = "ThoughtCard";
