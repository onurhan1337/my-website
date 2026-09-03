import React from "react";
import Link from "next/link";
import type { BlogCardProps } from "@/types";

function formatDay(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export const BlogCard = React.memo(
  ({ blog }: BlogCardProps) => (
    <article className="grid gap-x-5 gap-y-1 py-6 sm:grid-cols-[3.75rem_1fr]">
      <p className="font-mono text-caption text-ink-3 sm:pt-0.5">
        <time dateTime={blog.metadata.publishedAt}>
          {formatDay(blog.metadata.publishedAt)}
        </time>
      </p>
      <div className="min-w-0">
        <h2 className="font-medium">
          <Link href={`/blog/${blog.slug}`} className="link-ink">
            {blog.metadata.title}
          </Link>
        </h2>
        <p className="mt-1 text-ink-2">{blog.metadata.summary}</p>
        <p className="mt-2 text-caption text-ink-3">{blog.readingTime} min</p>
      </div>
    </article>
  ),
  (prev, next) =>
    prev.blog.slug === next.blog.slug &&
    prev.blog.metadata.publishedAt === next.blog.metadata.publishedAt &&
    prev.blog.readingTime === next.blog.readingTime &&
    prev.blog.metadata.title === next.blog.metadata.title &&
    prev.blog.metadata.summary === next.blog.metadata.summary
);

BlogCard.displayName = "BlogCard";
