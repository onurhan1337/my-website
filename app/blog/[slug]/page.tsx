import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";
import {
  getBlogPost,
  getAllBlogPosts,
  getBlogNeighbours,
} from "@/app/db/blog";
import { CustomMDX } from "@/components/mdx";
import Container from "@/components/shared/container";
import TableOfContents from "@/components/table-of-contents";
import { extractHeadings, formatDate } from "@/lib/utils";

export const dynamic = "force-static";
export const dynamicParams = false;

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
    modifiedAt: modifiedTime,
    summary: description,
    keywords,
  } = blog.metadata;

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
      ...(modifiedTime && { modifiedTime }),
      authors: ["Onurhan Demir"],
      url: blogUrl,
      siteName: "Onurhan Demir",
      locale: "en_US",
      alternateLocale: ["tr_TR"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@onurhan1337",
      creator: "@onurhan1337",
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

  const { newer, older } = await getBlogNeighbours(slug);

  const headings = extractHeadings(blog.content);
  const modifiedAt = blog.metadata.modifiedAt;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://onurhan.dev";
  const blogUrl = `${baseUrl}/blog/${blog.slug}`;

  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.metadata.title,
    datePublished: blog.metadata.publishedAt,
    ...(modifiedAt && { dateModified: modifiedAt }),
    description: blog.metadata.summary,
    image: blog.metadata.image
      ? `${baseUrl}${blog.metadata.image}`
      : `${baseUrl}/blog/${blog.slug}/opengraph-image`,
    url: blogUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
    author: {
      "@type": "Person",
      name: "Onurhan Demir",
      url: baseUrl,
      sameAs: [
        "https://github.com/onurhan1337",
        "https://youtube.com/@onurhandev",
        "https://x.com/onurhan1337",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Onurhan Demir",
      url: baseUrl,
    },
    inLanguage: "en-US",
    ...(blog.metadata.keywords && {
      keywords: Array.isArray(blog.metadata.keywords)
        ? blog.metadata.keywords.join(", ")
        : blog.metadata.keywords,
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.metadata.title,
        item: blogUrl,
      },
    ],
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <header className="mb-16">
        <h1 className="text-title">{blog.metadata.title}</h1>
        <p className="mt-4 text-caption text-ink-3">
          <time dateTime={blog.metadata.publishedAt}>
            {formatDate(blog.metadata.publishedAt)}
          </time>
          <span className="mx-2">·</span>
          <span>{blog.readingTime} min</span>
        </p>
      </header>
      <TableOfContents headings={headings} />
      <article className="prose">
        <CustomMDX source={blog.content} />
      </article>

      {(newer || older) && (
        <nav
          aria-label="More posts"
          className="mt-24 grid gap-8 rule pt-8 sm:grid-cols-2"
        >
          {newer ? (
            <div>
              <p className="text-caption text-ink-3">Newer</p>
              <p className="mt-1">
                <Link href={`/blog/${newer.slug}`} className="link">
                  {newer.metadata.title}
                </Link>
              </p>
            </div>
          ) : (
            <span />
          )}
          {older && (
            <div className="sm:text-right">
              <p className="text-caption text-ink-3">Older</p>
              <p className="mt-1">
                <Link href={`/blog/${older.slug}`} className="link">
                  {older.metadata.title}
                </Link>
              </p>
            </div>
          )}
        </nav>
      )}
    </Container>
  );
}
