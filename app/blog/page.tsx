import Pagination from "@/components/pagination";
import Container from "@/components/shared/container";
import type { Metadata } from "next";
import Script from "next/script";
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
    types: {
      "application/rss+xml": "https://onurhan.dev/feed.xml",
    },
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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://onurhan.dev";

  const blogCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/blog?page=${currentPage}`,
    name: "Blog | Onurhan Demir",
    description:
      "Read Onurhan Demir's thoughts on software development, design, React, Next.js, TypeScript, and modern web technologies. Articles about building web applications and B2B SaaS solutions.",
    url: `${baseUrl}/blog?page=${currentPage}`,
    mainEntity: {
      "@type": "Blog",
      name: "Onurhan Demir's Blog",
      description:
        "Software development articles, tutorials, and insights on React, Next.js, TypeScript, and modern web technologies.",
      author: {
        "@type": "Person",
        name: "Onurhan Demir",
        url: baseUrl,
      },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.metadata.title,
        url: `${baseUrl}/blog/${post.slug}`,
        datePublished: post.metadata.publishedAt,
        description: post.metadata.summary,
      })),
    },
  };

  return (
    <Container size="large">
      <Script
        id="blog-collection-structured-data"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogCollectionJsonLd),
        }}
      />
      <Pagination
        blogs={posts}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Container>
  );
}
