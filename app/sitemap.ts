import { getAllBlogPosts } from "app/db/blog";
import { getThoughts } from "app/db/thoughts";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://onurhan.dev";

  const allBlogPosts = await getAllBlogPosts();
  const blogs = allBlogPosts.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.metadata.modifiedAt || blog.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const thoughts = await getThoughts();
  const quotes = thoughts
    .filter((thought) => thought.metadata.type === "quote")
    .map((thought) => ({
      url: `${baseUrl}/thoughts/${thought.slug}`,
      lastModified: thought.metadata.createdAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/thoughts", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...routes, ...blogs, ...quotes];
}
