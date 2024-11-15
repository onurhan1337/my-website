import type { Metadata } from "next";
import { Fragment } from "react";

import { BlogCard } from "@/components/blog-card";
import Container from "@/components/shared/container";
import Separator from "@/components/shared/separator";
import { getBlogPosts } from "../db/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default function Blog() {
  const allBlogs = getBlogPosts();

  return (
    <Container size="large">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((blog, index, array) => (
          <Fragment key={blog.slug}>
            <BlogCard blog={blog} />
            {index !== array.length - 1 && <Separator />}
          </Fragment>
        ))}
    </Container>
  );
}
