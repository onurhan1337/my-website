"use client";

import { memo } from "react";
import { BlogCard } from "./blog-card";
import type { BlogListItem, BlogListProps } from "@/types";

/** Posts arrive newest first, so the years come out in order too. */
function groupByYear(blogs: BlogListItem[]): [string, BlogListItem[]][] {
  const groups: [string, BlogListItem[]][] = [];

  for (const blog of blogs) {
    const year = blog.metadata.publishedAt.slice(0, 4);
    const last = groups[groups.length - 1];
    if (last && last[0] === year) last[1].push(blog);
    else groups.push([year, [blog]]);
  }

  return groups;
}

export const BlogList = memo(
  function BlogList({ blogs }: BlogListProps) {
    return (
      <div>
        {groupByYear(blogs).map(([year, posts]) => (
          <section key={year} className="mt-12 first:mt-0">
            <p className="mb-2 font-mono text-caption text-ink-3">{year}</p>
            <div className="divide-y divide-rule border-t border-rule">
              {posts.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
  (prev, next) => {
    if (prev.currentPage !== next.currentPage) return false;
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
