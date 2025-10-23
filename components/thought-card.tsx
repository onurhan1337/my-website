import { formatDate } from "@/lib/utils";
import type { Thought } from "@/types/thought";

interface ThoughtCardProps {
  thought: Thought & { renderedContent: React.ReactNode };
}

const typeLabels = {
  code: "CODE",
  idea: "IDEA",
  quote: "QUOTE",
  book: "BOOK",
};

export function ThoughtCard({ thought }: ThoughtCardProps) {
  const { type, createdAt } = thought.metadata;

  return (
    <article className="py-4 sm:py-6 dark:border-b-zinc-800 focus:outline-none">
      <header className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs uppercase tracking-wider opacity-50 dark:opacity-40">
            {typeLabels[type]}
          </span>
          <time className="font-mono text-xs uppercase tracking-wider opacity-50 dark:opacity-40">
            {formatDate(createdAt, { time: true })}
          </time>
        </div>
      </header>

      <div className="thoughts-prose prose prose-sm prose-neutral dark:prose-invert max-w-none">
        {thought.renderedContent}
      </div>
    </article>
  );
}
