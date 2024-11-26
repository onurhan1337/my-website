"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (page === 1) {
      router.push("/blog");
    } else {
      router.push(`/blog?page=${page}`);
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-8">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        variant="outline"
        className={cn(
          "tracking-tight shadow-none",
          isFirstPage && "opacity-50"
        )}
      >
        Previous
      </Button>

      <span className="flex items-center tracking-tight text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        variant="outline"
        className={cn("tracking-tight shadow-none", isLastPage && "opacity-50")}
      >
        Next
      </Button>
    </div>
  );
}
