"use client";

import { cn } from "@/lib/utils";
import type { Blog } from "@/types/blog";
import { useRouter } from "next/navigation";
import { BlogList } from "./blog-list";
import { Button } from "./ui/button";

interface PaginationProps {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  blogs,
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const path = page === 1 ? "/blog" : `/blog?page=${page}`;
    router.push(path);
  };

  return (
    <>
      <BlogList blogs={blogs} currentPage={currentPage} />
      <nav
        aria-label="Blog pagination"
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
