import React from "react";
import { formatDate } from "@/lib/utils";
import type { ThoughtCardProps } from "@/types";
import { QuoteCard } from "@/components/quote-card";

const typeLabels = {
  code: "Code",
  idea: "Idea",
  quote: "Quote",
  book: "Book",
};

export const ThoughtCard = React.memo(
  ({ thought }: ThoughtCardProps) => {
    const { type, createdAt } = thought.metadata;

    if (type === "quote") {
      return <QuoteCard thought={thought} />;
    }

    return (
      <article className="py-10 first:pt-0">
        <p className="mb-4 text-caption text-ink-3">
          <span>{typeLabels[type]}</span>
          <span className="mx-2">·</span>
          <time dateTime={createdAt}>{formatDate(createdAt, { time: true })}</time>
        </p>
        <div className="prose">{thought.renderedContent}</div>
      </article>
    );
  },
  (prev, next) =>
    prev.thought.slug === next.thought.slug &&
    prev.thought.renderedContent === next.thought.renderedContent &&
    prev.thought.metadata.createdAt === next.thought.metadata.createdAt &&
    prev.thought.metadata.type === next.thought.metadata.type
);

ThoughtCard.displayName = "ThoughtCard";
