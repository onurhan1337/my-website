import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getBlogPost, getAllBlogPosts } from "@/app/db/blog";
import Claps from "@/components/claps";
import { CustomMDX } from "@/components/mdx";
import TableOfContents from "@/components/table-of-contents";
import { extractHeadings, formatDate } from "@/lib/utils";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { slug } = await params;
  const blog = await getBlogPost(slug);

  if (!blog) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    keywords,
  } = blog.metadata;

  const ogImage =
    new URL(
      "/opengraph-image",
      process.env.NEXT_PUBLIC_APP_URL || "https://onurhan.dev"
    ).toString() + `?title=${encodeURIComponent(title)}`;

  const blogUrl = `https://onurhan.dev/blog/${blog.slug}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: blogUrl,
      siteName: "Onurhan Demir",
      locale: "en_US",
      alternateLocale: ["tr_TR"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@onurhan1337",
      creator: "@onurhan1337",
      images: [ogImage],
    },
    alternates: {
      canonical: blogUrl,
      languages: {
        en: blogUrl,
        tr: blogUrl,
      },
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogPost(slug);

  if (!blog) {
    notFound();
  }

  const headings = extractHeadings(blog.content);

  return (
    <section className="mx-auto px-2 sm:px-6 lg:px-8 w-full sm:max-w-5xl bg-background">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.metadata.title,
            datePublished: blog.metadata.publishedAt,
            dateModified:
              blog.metadata.publishedAt || blog.metadata.publishedAt,
            description: blog.metadata.summary,
            image: blog.metadata.image
              ? `https://onurhan.dev${blog.metadata.image}`
              : `https://onurhan.dev/og?title=${blog.metadata.title}`,
            url: `https://onurhan.dev/blog/${blog.slug}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://onurhan.dev/blog/${blog.slug}`,
            },
            author: {
              "@type": "Person",
              name: "Onurhan Demir",
              url: "https://onurhan.dev",
              sameAs: [
                "https://github.com/onurhan1337",
                "https://youtube.com/@onurhandev",
                "https://x.com/onurhan1337",
              ],
            },
            publisher: {
              "@type": "Person",
              name: "Onurhan Demir",
              url: "https://onurhan.dev",
            },
            inLanguage: "en-US",
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tight max-w-[650px]">
        {blog.metadata.title}
      </h1>
      <div className="flex justify-start items-center mt-3 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-[15px] opacity-60 tracking-tight">
            {formatDate(blog.metadata.publishedAt)}
          </p>
          <span className="mx-2 opacity-40">—</span>
          <p className="text-[15px] opacity-60 tracking-tight">
            {blog.readingTime} min read
          </p>
        </Suspense>
      </div>
      <TableOfContents headings={headings} />
      <article className="prose prose-quoteless prose-neutral text-justify w-auto">
        <CustomMDX source={blog.content} />
      </article>

      <Claps postKey={blog.slug} />
    </section>
  );
}
