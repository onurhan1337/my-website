"use client";

import { memo } from "react";
import Link from "next/link";
import type { PaginationProps } from "@/types";
import { BlogList } from "./blog-list";

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
            className="mt-16 grid grid-cols-3 items-baseline text-small"
          >
            <span className="justify-self-start">
              {prevPage && (
                <Link href={prevHref} className="link">
                  Newer
                </Link>
              )}
            </span>
            <span className="justify-self-center font-mono text-caption text-ink-3">
              {currentPage} / {totalPages}
            </span>
            <span className="justify-self-end">
              {nextPage && (
                <Link href={nextHref} className="link">
                  Older
                </Link>
              )}
            </span>
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
