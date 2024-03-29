import Container from "@/components/shared/container";
import { getBlogPosts } from "../db/blog";
import Link from "next/link";
import { Fragment } from "react";

export default function Blog() {
  const allBlogs = getBlogPosts();

  return (
    <Container>
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
            <article className="py-4 sm:py-8 dark:border-b-zinc-800">
              <header>
                <h3 className="font-semibold underline underline-offset-4 decoration-1 decoration-zinc-300">
                  <Link href={`/blog/${blog.slug}`}>{blog.metadata.title}</Link>
                </h3>
                <p className="mt-1 opacity-70 dark:opacity-60">
                  {blog.metadata.summary}
                </p>
              </header>
              <footer className="mt-1 flex items-center space-x-2 font-mono text-sm uppercase tracking-wider opacity-50 dark:opacity-40">
                <time>
                  {new Date(blog.metadata.publishedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
                <span>·</span>
                <span>{blog.readingTime} MIN READ</span>
              </footer>
            </article>
            {index !== array.length - 1 && (
              <div className="flex justify-center">
                <div className="flex justify-center">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-1"
                    />
                  ))}
                </div>
              </div>
            )}
          </Fragment>
        ))}
    </Container>
  );
}
