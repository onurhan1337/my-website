import Link from "next/link";

export const BlogCard = ({ blog }) => {
  return (
    <article className="py-6 border-b border-foreground/5 last:border-0">
      <header>
        <h3 className="font-medium text-[17px] leading-tight tracking-tight">
          <Link
            href={`/blog/${blog.slug}`}
            className="hover:opacity-70 transition-opacity"
          >
            {blog.metadata.title}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed opacity-70">
          {blog.metadata.summary}
        </p>
      </header>
      <footer className="mt-3 flex items-center gap-2 text-[13px] opacity-40 tracking-tight">
        <time>
          {new Date(blog.metadata.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span>·</span>
        <span>{blog.readingTime} min</span>
      </footer>
    </article>
  );
};
