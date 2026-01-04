"use client";

import { memo } from "react";
import { BlogCard } from "./blog-card";
import type { BlogListProps } from "@/types";

export const BlogList = memo(
  function BlogList({ blogs, currentPage }: BlogListProps) {
    return (
      <div>
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
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
