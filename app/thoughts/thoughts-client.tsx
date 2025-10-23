"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Thought } from "@/types/thought";
import { ThoughtCard } from "@/components/thought-card";
import { Button } from "@/components/ui/button";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter =
    (searchParams?.get("filter") as (typeof typeFilters)[number]["key"]) ||
    "all";

  const { currentPage, totalPages, paginatedThoughts } = useMemo(() => {
    const currentPage = Math.max(1, Number(searchParams?.get("page")) || 1);

    const filteredThoughts =
      activeFilter === "all"
        ? thoughts
        : thoughts.filter((thought) => thought.metadata.type === activeFilter);

    const thoughtsPerPage = 8;
    const totalPages = Math.max(
      1,
      Math.ceil(filteredThoughts.length / thoughtsPerPage)
    );

    const paginatedThoughts = [...filteredThoughts]
      .sort(
        (a, b) =>
          new Date(b.metadata.createdAt).getTime() -
          new Date(a.metadata.createdAt).getTime()
      )
      .slice(
        (currentPage - 1) * thoughtsPerPage,
        currentPage * thoughtsPerPage
      );

    return { currentPage, totalPages, paginatedThoughts };
  }, [thoughts, searchParams, activeFilter]);

  const handleFilterChange = (filter: (typeof typeFilters)[number]["key"]) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    params.delete("page");
    const query = params.toString();
    router.push(query ? `/thoughts?${query}` : "/thoughts");
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams?.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    if (activeFilter !== "all") {
      params.set("filter", activeFilter);
    }
    const query = params.toString();
    router.push(query ? `/thoughts?${query}` : "/thoughts");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  return (
    <div className="pb-32">
      <div className="mb-8">
        <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px] mb-4">
          Thoughts
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-[650px]">
          Quick thoughts, ideas, code snippets, quotes, and book notes.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {paginatedThoughts.map((thought) => (
            <motion.div key={thought.slug} variants={item}>
              <ThoughtCard thought={thought} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <nav
          aria-label="Thoughts pagination"
          className="flex justify-center gap-4 mt-8"
        >
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            className={cn("tracking-tight shadow-none", currentPage === 1 && "opacity-50")}
          >
            Previous
          </Button>

          <span className="flex items-center tracking-tight text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            className={cn("tracking-tight shadow-none", currentPage === totalPages && "opacity-50")}
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
        <div className="bg-background/95 backdrop-blur-xl border border-border rounded-full shadow-2xl px-3 py-2">
          <div className="flex items-center gap-1">
            {typeFilters.map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={cn(
                  "relative px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 rounded-full",
                  activeFilter === filter.key
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeFilter === filter.key && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
