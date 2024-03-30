import { getBlogPosts } from "@/app/db/blog";
import { CustomMDX } from "@/components/mdx";
import Container from "@/components/shared/container";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function BlogDetailPage({ params }) {
  const blog = getBlogPosts().find((blog) => blog.slug === params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.metadata.title,
            datePublished: blog.metadata.publishedAt,
            dateModified: blog.metadata.publishedAt,
            description: blog.metadata.summary,
            image: blog.metadata.image
              ? `https://onurhan.dev${blog.metadata.image}`
              : `https://onurhan.dev/og?title=${blog.metadata.title}`,
            url: `https://onurhan.dev/blog/${blog.slug}`,
            author: {
              "@type": "Person",
              name: "Onurhan Demir",
            },
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {blog.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 text-justify">
            {formatDate(blog.metadata.publishedAt)}
          </p>
        </Suspense>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert text-justify">
        <CustomMDX source={blog.content} />
      </article>
    </section>
  );
}
