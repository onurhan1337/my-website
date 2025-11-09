import Pagination from "@/components/pagination";
import Container from "@/components/shared/container";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getBlogPosts } from "../db/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Blog({ searchParams }: BlogPageProps) {
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1, Number(page));
  const { posts, totalPages } = getBlogPosts(currentPage);

  return (
    <Container size="large">
      <Suspense fallback={<div>Loading...</div>}>
        <Pagination
          blogs={posts}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Suspense>
    </Container>
  );
}
