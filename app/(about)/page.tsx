import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { getAllBlogPostsList } from "@/app/db/blog";
import { getThoughts } from "@/app/db/thoughts";
import { getAllProjects } from "@/lib/projects";
import { quoteExcerpt } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "About",
  description:
    "Onurhan Demir is a Developer Advocate & Frontend Developer at ikas, specializing in developer ecosystems, UX-focused interfaces, and e-commerce solutions. Based in Turkey.",
  keywords: [
    "Onurhan Demir",
    "Onurhan Demir About",
    "Onurhan Demir Developer Advocate",
    "Onurhan Demir Türkiye",
    "Developer Advocate",
    "Frontend Developer",
    "Full Stack Developer",
    "Software Developer Turkey",
    "Yazılım Geliştirici Türkiye",
    "Full Stack Developer Türkiye",
    "ikas developer",
    "e-commerce development",
    "UX development",
  ],
  openGraph: {
    title: "About | Onurhan Demir",
    description:
      "Onurhan Demir is a Developer Advocate & Frontend Developer at ikas, focused on developer ecosystems, UX, and e-commerce solutions. Based in Turkey.",
    url: "https://onurhan.dev",
  },
  alternates: {
    canonical: "https://onurhan.dev",
  },
};

export const dynamic = "force-static";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Onurhan Demir",
  alternateName: "Onurhan",
  jobTitle: "Developer Advocate & Frontend Developer",
  url: "https://onurhan.dev",
  description:
    "Developer Advocate & Frontend Developer at ikas, focused on developer ecosystems, UX, and e-commerce solutions. Building useful digital products with modern web technologies.",
  knowsAbout: [
    "Software Development",
    "Web Development",
    "Product Development",
    "UX Design",
    "E-commerce Development",
    "Shopify",
    "Ikas",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
  ],
  sameAs: [
    "https://github.com/onurhan1337",
    "https://youtube.com/@onurhandev",
    "https://x.com/onurhan1337",
    "https://kizzle.studio",
  ],
  worksFor: {
    "@type": "Organization",
    name: "ikas",
    url: "https://ikas.com",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "TR",
  },
};

function formatShort(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function Home() {
  const [posts, thoughts, projects] = await Promise.all([
    getAllBlogPostsList(),
    getThoughts(),
    Promise.resolve(getAllProjects()),
  ]);

  const latestPost = posts[0];
  const latestQuote = thoughts.find((t) => t.metadata.type === "quote");
  const latestProject = projects[0];

  const index = [
    {
      label: "Blog",
      href: "/blog",
      count: `${posts.length} posts`,
      latest: latestPost && {
        title: latestPost.metadata.title,
        href: `/blog/${latestPost.slug}`,
        meta: formatShort(latestPost.metadata.publishedAt),
      },
    },
    {
      label: "Thoughts",
      href: "/thoughts",
      count: `${thoughts.length} notes`,
      latest: latestQuote && {
        title: quoteExcerpt(latestQuote.content, 72),
        href: `/thoughts/${latestQuote.slug}`,
        meta: formatShort(latestQuote.metadata.createdAt),
      },
    },
    {
      label: "Work",
      href: "/work",
      count: "2023 — now",
      latest: {
        title: "Developer Advocate & Frontend Developer, ikas",
        href: "/work",
        meta: "Current",
      },
    },
    {
      label: "Projects",
      href: "/projects",
      count: `${projects.length} projects`,
      latest: latestProject && {
        title: latestProject.title,
        href: `/projects/${latestProject.slug}`,
        meta: latestProject.description,
      },
    },
  ];

  return (
    <>
      <header>
        <h1 className="text-title">Onurhan Demir</h1>
        <p className="mt-3 text-ink-2">
          Developer Advocate and Frontend Developer at{" "}
          <a
            href="https://ikas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline decoration-ink-3 decoration-1 underline-offset-[3px] transition-colors hover:decoration-ink"
          >
            ikas
          </a>
          . I help grow the developer ecosystem and build things for merchants
          and developers.
        </p>
      </header>

      <section className="mt-20 divide-y divide-rule rule">
        {index.map((item) => (
          <div
            key={item.href}
            className="grid gap-x-6 gap-y-2 py-6 sm:grid-cols-[8rem_1fr]"
          >
            <div>
              <Link href={item.href} className="font-medium link-ink">
                {item.label}
              </Link>
              <p className="mt-0.5 text-caption text-ink-3">{item.count}</p>
            </div>
            {item.latest && (
              <div className="min-w-0">
                <Link href={item.latest.href} className="link">
                  {item.latest.title}
                </Link>
                <p className="mt-0.5 truncate text-caption text-ink-3">
                  {item.latest.meta}
                </p>
              </div>
            )}
          </div>
        ))}
      </section>

      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
