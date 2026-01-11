import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogPost, getAllBlogPosts } from "@/app/db/blog";
import ClapsButton from "@/components/claps";
import { CustomMDX } from "@/components/mdx";
import Container from "@/components/shared/container";
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
    modifiedAt: modifiedTime,
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
      ...(modifiedTime && { modifiedTime }),
      authors: ["Onurhan Demir"],
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
      : `${baseUrl}/opengraph-image?title=${encodeURIComponent(
          blog.metadata.title
        )}`,
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
    <Container size="large">
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
      <h1 className="title font-medium text-2xl tracking-tight">
        {blog.metadata.title}
      </h1>
      <div className="flex justify-start items-center mt-3 mb-8 text-sm">
        <p className="text-[15px] opacity-60 tracking-tight">
          {formatDate(blog.metadata.publishedAt)}
        </p>
        <span className="mx-2 opacity-40">—</span>
        <p className="text-[15px] opacity-60 tracking-tight">
          {blog.readingTime} min read
        </p>
      </div>
      <TableOfContents headings={headings} />
      <article className="prose prose-quoteless prose-neutral text-justify w-auto">
        <CustomMDX source={blog.content} />
      </article>

      <ClapsButton key={blog.slug} blogSlug={blog.slug} />
    </Container>
  );
}
