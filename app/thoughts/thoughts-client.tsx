"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Thought } from "@/types/thought";
import { ThoughtCard } from "@/components/thought-card";
import { Button } from "@/components/ui/button";
import { useThoughtsStore } from "@/stores/thoughts-store";

const THOUGHTS_PER_PAGE = 8;

const typeFilters = [
  { key: "all", label: "All" },
  { key: "code", label: "Code" },
  { key: "idea", label: "Idea" },
  { key: "quote", label: "Quote" },
  { key: "book", label: "Book" },
] as const;

interface ThoughtsClientProps {
  thoughts: (Thought & { renderedContent: React.ReactNode })[];
}

export function ThoughtsClient({ thoughts }: ThoughtsClientProps) {
  const { filter, page, setFilter, setPage } = useThoughtsStore();

  const { paginatedThoughts, totalPages, hasNextPage, hasPreviousPage } =
    useMemo(() => {
      const filteredThoughts =
        filter === "all"
          ? thoughts
          : thoughts.filter((thought) => thought.metadata.type === filter);

      const totalPages = Math.max(
        1,
        Math.ceil(filteredThoughts.length / THOUGHTS_PER_PAGE)
      );

      const paginatedThoughts = [...filteredThoughts]
        .sort(
          (a, b) =>
            new Date(b.metadata.createdAt).getTime() -
            new Date(a.metadata.createdAt).getTime()
        )
        .slice((page - 1) * THOUGHTS_PER_PAGE, page * THOUGHTS_PER_PAGE);

      return {
        paginatedThoughts,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    }, [thoughts, page, filter]);

  return (
    <div className="pb-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {paginatedThoughts.map((thought) => (
            <motion.div
              key={thought.slug}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 10,
                duration: 0.5,
              }}
            >
              <ThoughtCard thought={thought} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <nav
          aria-label="Thoughts pagination"
          className="flex justify-center gap-4 mt-12"
        >
          <Button
            onClick={() => setPage(page - 1)}
            disabled={!hasPreviousPage}
            variant="outline"
            className={cn(
              "tracking-tight shadow-none border-foreground/10 hover:bg-foreground/[0.02]",
              !hasPreviousPage && "opacity-30 cursor-not-allowed"
            )}
          >
            Previous
          </Button>

          <span className="flex items-center tracking-tight text-sm opacity-50">
            Page {page} of {totalPages}
          </span>

          <Button
            onClick={() => setPage(page + 1)}
            disabled={!hasNextPage}
            variant="outline"
            className={cn(
              "tracking-tight shadow-none border-foreground/10 hover:bg-foreground/[0.02]",
              !hasNextPage && "opacity-30 cursor-not-allowed"
            )}
          >
            Next
          </Button>
        </nav>
      )}

      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-full shadow-lg px-3 py-2">
          <div className="flex items-center gap-1">
            {typeFilters.map((filterOption) => (
              <motion.button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={cn(
                  "relative px-4 py-2 text-xs tracking-wider transition-all duration-300 rounded-full",
                  filter === filterOption.key
                    ? "text-background"
                    : "opacity-50 hover:opacity-100"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === filterOption.key && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filterOption.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
