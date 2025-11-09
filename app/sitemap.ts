import { getAllBlogPosts } from "app/db/blog";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = getAllBlogPosts().map((blog) => ({
    url: `https://onurhan.dev/blog/${blog.slug}`,
    lastModified: blog.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let routes = ["", "/blog", "/thoughts", "/work"].map((route) => ({
    url: `https://onurhan.dev${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes, ...blogs];
}
