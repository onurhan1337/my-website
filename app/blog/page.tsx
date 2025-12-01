import Pagination from "@/components/pagination";
import Container from "@/components/shared/container";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getBlogPosts } from "../db/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Onurhan Demir's thoughts on software development, design, React, Next.js, TypeScript, and modern web technologies. Articles about building web applications and B2B SaaS solutions.",
  keywords: [
    "Onurhan Demir Blog",
    "Software Development Blog",
    "React Blog",
    "Next.js Blog",
    "TypeScript Blog",
    "Web Development Articles",
  ],
  openGraph: {
    title: "Blog | Onurhan Demir",
    description:
      "Read Onurhan Demir's thoughts on software development, design, and modern web technologies.",
    url: "https://onurhan.dev/blog",
  },
  alternates: {
    canonical: "https://onurhan.dev/blog",
  },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const revalidate = 3600;

export default async function Blog({ searchParams }: BlogPageProps) {
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1, Number(page));
  const { posts, totalPages } = await getBlogPosts(currentPage);

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
