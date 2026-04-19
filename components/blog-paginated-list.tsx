"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "./pagination";
import type { BlogListItem } from "@/types/blog";

const POSTS_PER_PAGE = 5;

function PaginatedContent({ posts }: { posts: BlogListItem[] }) {
  const searchParams = useSearchParams();
  const pageParam = searchParams?.get("page") ?? "1";
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginated = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <Pagination
      blogs={paginated}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}

export function BlogPaginatedList({ posts }: { posts: BlogListItem[] }) {
  return (
    <Suspense fallback={null}>
      <PaginatedContent posts={posts} />
    </Suspense>
  );
}
