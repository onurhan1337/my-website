import Link from "next/link";

export const BlogCard = ({ blog }) => {
  return (
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
          {new Date(blog.metadata.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>·</span>
        <span>{blog.readingTime} MIN READ</span>
      </footer>
    </article>
  );
};
