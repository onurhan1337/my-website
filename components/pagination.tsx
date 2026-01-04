"use client";

import { memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PaginationProps } from "@/types";
import { BlogList } from "./blog-list";
import { Button } from "./ui/button";

const PaginationComponent = memo(
  function Pagination({ blogs, currentPage, totalPages }: PaginationProps) {
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevHref = prevPage === 1 ? "/blog" : `/blog?page=${prevPage}`;
    const nextHref = `/blog?page=${nextPage}`;

    return (
      <>
        <BlogList blogs={blogs} currentPage={currentPage} />
        {totalPages > 1 && (
          <nav
            aria-label="Blog pagination"
            className="flex justify-center gap-4 mt-12"
          >
            {prevPage ? (
              <Button
                asChild
                variant="outline"
                className={cn(
                  "tracking-tight shadow-none border-foreground/10 hover:bg-foreground/2"
                )}
              >
                <Link href={prevHref} prefetch={true}>
                  Previous
                </Link>
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                className={cn(
                  "tracking-tight shadow-none border-foreground/10 hover:bg-foreground/2 opacity-30 cursor-not-allowed"
                )}
              >
                Previous
              </Button>
            )}

            <span className="flex items-center tracking-tight text-sm opacity-50">
              Page {currentPage} of {totalPages}
            </span>

            {nextPage ? (
              <Button
                asChild
                variant="outline"
                className={cn(
                  "tracking-tight shadow-none border-foreground/10 hover:bg-foreground/2"
                )}
              >
                <Link href={nextHref} prefetch={true}>
                  Next
                </Link>
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                className={cn(
                  "tracking-tight shadow-none border-foreground/10 hover:bg-foreground/2 opacity-30 cursor-not-allowed"
                )}
              >
                Next
              </Button>
            )}
          </nav>
        )}
      </>
    );
  },
  (prev, next) => {
    if (prev.currentPage !== next.currentPage) return false;
    if (prev.totalPages !== next.totalPages) return false;
    if (prev.blogs.length !== next.blogs.length) return false;

    return prev.blogs.every(
      (blog, index) =>
        blog.slug === next.blogs[index]?.slug &&
        blog.metadata.publishedAt === next.blogs[index]?.metadata.publishedAt &&
        blog.metadata.title === next.blogs[index]?.metadata.title &&
        blog.metadata.summary === next.blogs[index]?.metadata.summary &&
        blog.readingTime === next.blogs[index]?.readingTime
    );
  }
);

PaginationComponent.displayName = "Pagination";

export default PaginationComponent;
