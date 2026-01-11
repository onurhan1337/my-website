import { getAllBlogPosts } from "app/db/blog";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://onurhan.dev";

  const allBlogPosts = await getAllBlogPosts();
  const blogs = allBlogPosts.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.metadata.modifiedAt || blog.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/thoughts", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...routes, ...blogs];
}
