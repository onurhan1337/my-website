import { getAllBlogPostsList } from "@/app/db/blog";
import { getThoughts } from "@/app/db/thoughts";
import { getAllProjects } from "@/lib/projects";
import { quoteExcerpt } from "@/lib/quotes";

export const dynamic = "force-static";

const BASE_URL = "https://onurhan.dev";

function day(date: string): string {
  return date.slice(0, 10);
}

/**
 * Generated at build time so it never drifts from the site. An assistant
 * that reads only this file should still be able to answer who Onurhan is,
 * what he has written, and where to find the full text.
 */
export async function GET(): Promise<Response> {
  const [posts, thoughts] = await Promise.all([
    getAllBlogPostsList(),
    getThoughts(),
  ]);
  const projects = getAllProjects();
  const quotes = thoughts.filter((t) => t.metadata.type === "quote");

  const lines: string[] = [];
  const push = (...rows: string[]) => lines.push(...rows);

  push(
    "# Onurhan Demir",
    "",
    "> Developer Advocate and Frontend Developer at ikas, based in Turkey.",
    "> Works on the ikas developer ecosystem: app store, theme store, and Studio.",
    "> Writes about frontend engineering, e-commerce, and how agents read product data.",
    "> This file is generated at build time from the site's own content.",
    "",
    "Canonical domain: " + BASE_URL,
    "Author: Onurhan Demir (onurhandtr@gmail.com, @onurhan1337 on X and GitHub)",
    "Languages: posts are in English; some short notes are in Turkish.",
    "Licence: content is the author's. Quote it with attribution and a link.",
    "",
    "## Sections",
    "",
    `- [Home](${BASE_URL}/): who he is, plus the latest item from each section`,
    `- [Blog](${BASE_URL}/blog): ${posts.length} long-form posts`,
    `- [Thoughts](${BASE_URL}/thoughts): ${thoughts.length} short notes, mostly quotes`,
    `- [Work](${BASE_URL}/work): roles and what he did in each`,
    `- [Projects](${BASE_URL}/projects): ${projects.length} projects with write-ups`,
    "",
    "## Machine-readable",
    "",
    `- [Sitemap](${BASE_URL}/sitemap.xml): every URL`,
    `- [RSS](${BASE_URL}/feed.xml): full post feed`,
    "- Every page carries schema.org JSON-LD: Person on the home page,",
    "  BlogPosting on posts, Quotation on notes.",
    "- The site is a static export. Every URL returns complete HTML with no",
    "  client-side rendering needed, so plain fetches get the whole page.",
    "",
    "## Blog posts",
    "",
    "Newest first. Each line: date, title, URL, then the post's own summary.",
    ""
  );

  for (const post of posts) {
    push(
      `- ${day(post.metadata.publishedAt)} — [${post.metadata.title}](${BASE_URL}/blog/${post.slug})`,
      `  ${post.metadata.summary}`
    );
  }

  push("", "## Notes and quotes", "");

  for (const note of thoughts) {
    const isQuote = note.metadata.type === "quote";
    const label = note.metadata.title ?? quoteExcerpt(note.content, 70);
    const url = isQuote
      ? `[${label}](${BASE_URL}/thoughts/${note.slug})`
      : label;
    push(`- ${day(note.metadata.createdAt)} — ${note.metadata.type}: ${url}`);
    if (isQuote) push(`  ${quoteExcerpt(note.content, 180)}`);
  }

  push("", "## Projects", "");

  for (const project of projects) {
    push(
      `- [${project.title}](${BASE_URL}/projects/${project.slug}) — ${project.category}, ${project.date.slice(0, 4)}`,
      `  ${project.description}`,
      ...(project.liveUrl ? [`  Live: ${project.liveUrl}`] : []),
      ...(project.githubUrl ? [`  Source: ${project.githubUrl}`] : [])
    );
  }

  push(
    "",
    "## Work",
    "",
    "- ikas, 2026 — present: Developer Advocate and Frontend Developer.",
    "  Grows the developer ecosystem around the app store, theme store, and Studio.",
    "- Kizzle Studio, 2025 — 2026: Software Developer. Shopify and ikas builds.",
    "- Insider One, 2024 — 2025: Software Developer. B2B SaaS for enterprise clients.",
    "- ION Labs, 2024: Frontend Engineer. Next.js, Docker, PostgreSQL.",
    "- Utilify, 2023 — 2024: Frontend Engineer. Dashboards and campaign pages.",
    "",
    "## Contact",
    "",
    "- Email: onurhandtr@gmail.com",
    "- X: https://x.com/onurhan1337",
    "- GitHub: https://github.com/onurhan1337",
    "- YouTube: https://youtube.com/@onurhandev",
    ""
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
