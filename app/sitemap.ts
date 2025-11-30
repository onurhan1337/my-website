import { getAllBlogPosts } from "app/db/blog";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://onurhan.dev";

  const allBlogPosts = await getAllBlogPosts();
  const blogs = allBlogPosts.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        en: `${baseUrl}/blog/${blog.slug}`,
        tr: `${baseUrl}/blog/${blog.slug}`,
      },
    },
  }));

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/thoughts", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        en: `${baseUrl}${route.path}`,
        tr: `${baseUrl}${route.path}`,
        "x-default": `${baseUrl}${route.path}`,
      },
    },
  }));

  return [...routes, ...blogs];
}
