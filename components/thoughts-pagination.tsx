"use client";

import { cn } from "@/lib/utils";
import type { Thought } from "@/types/thought";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ThoughtsList } from "./thoughts-list";
import { Button } from "./ui/button";

interface ThoughtsPaginationProps {
  allThoughts: (Thought & { renderedContent: React.ReactNode })[];
  thoughtsPerPage?: number;
  filter?: string;
}

export default function ThoughtsPagination({
  allThoughts,
  thoughtsPerPage = 8,
  filter = "all",
}: ThoughtsPaginationProps) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  const { currentPage, totalPages, paginatedThoughts } = useMemo(() => {
    const searchParams = searchParamsHook ?? new URLSearchParams();
    const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

    const filteredThoughts =
      filter === "all"
        ? allThoughts
        : allThoughts.filter((thought) => thought.metadata.type === filter);

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
  }, [allThoughts, searchParamsHook, thoughtsPerPage, filter]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParamsHook?.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    if (filter !== "all") {
      params.set("filter", filter);
    }
    const query = params.toString();
    const path = query ? `/thoughts?${query}` : "/thoughts";
    router.push(path);
  };

  return (
    <>
      <ThoughtsList thoughts={paginatedThoughts} currentPage={currentPage} />
      {totalPages > 1 && (
        <nav
          aria-label="Thoughts pagination"
          className="flex justify-center gap-4 mt-12"
        >
          <PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PaginationButton>

          <span className="flex items-center tracking-tight text-sm opacity-50">
            Page {currentPage} of {totalPages}
          </span>

          <PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PaginationButton>
        </nav>
      )}
    </>
  );
}

function PaginationButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="outline"
      className={cn(
        "tracking-tight shadow-none border-foreground/10 hover:bg-foreground/[0.02]",
        disabled && "opacity-30 cursor-not-allowed"
      )}
    >
      {children}
    </Button>
  );
}
