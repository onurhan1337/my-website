"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { ThoughtPost } from "@/types/thought";
import { ThoughtCard } from "@/components/thought-card";
import { useThoughtsStore } from "@/stores/thoughts-store";

const THOUGHTS_PER_PAGE = 8;

const typeFilters = [
  { key: "all", label: "All" },
  { key: "quote", label: "Quotes" },
  { key: "idea", label: "Ideas" },
  { key: "code", label: "Code" },
  { key: "book", label: "Books" },
] as const;

interface ThoughtsClientProps {
  thoughts: (ThoughtPost & { renderedContent: React.ReactNode })[];
}

export function ThoughtsClient({ thoughts }: ThoughtsClientProps) {
  const { filter, page, setFilter, setPage } = useThoughtsStore();

  const { paginatedThoughts, totalPages } = useMemo(() => {
    const filtered =
      filter === "all"
        ? thoughts
        : thoughts.filter((thought) => thought.metadata.type === filter);
    const totalPages = Math.max(
      1,
      Math.ceil(filtered.length / THOUGHTS_PER_PAGE)
    );
    return {
      paginatedThoughts: filtered.slice(
        (page - 1) * THOUGHTS_PER_PAGE,
        page * THOUGHTS_PER_PAGE
      ),
      totalPages,
    };
  }, [thoughts, page, filter]);

  return (
    <div>
      <nav aria-label="Filter" className="mb-12 flex gap-5 text-small">
        {typeFilters.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setFilter(option.key)}
            aria-pressed={filter === option.key}
            className={cn(
              "transition-colors duration-150",
              filter === option.key ? "text-ink" : "text-ink-2 hover:text-ink"
            )}
          >
            {option.label}
          </button>
        ))}
      </nav>

      {paginatedThoughts.length === 0 ? (
        <p className="text-ink-2">Nothing here yet.</p>
      ) : (
        <div className="divide-y divide-rule">
          {paginatedThoughts.map((thought) => (
            <ThoughtCard key={thought.slug} thought={thought} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Thoughts pagination"
          className="mt-16 grid grid-cols-3 items-baseline text-small"
        >
          <span className="justify-self-start">
            {page > 1 && (
              <button type="button" onClick={() => setPage(page - 1)} className="link">
                Newer
              </button>
            )}
          </span>
          <span className="justify-self-center font-mono text-caption text-ink-3">
            {page} / {totalPages}
          </span>
          <span className="justify-self-end">
            {page < totalPages && (
              <button type="button" onClick={() => setPage(page + 1)} className="link">
                Older
              </button>
            )}
          </span>
        </nav>
      )}
    </div>
  );
}
