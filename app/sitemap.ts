import { allPosts } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    url: `https://onurhan.dev/post/${post.slug}`,
  }));

  const routes = ["", "/post", "/snippet", "/about"].map((route) => ({
    url: `https://onurhan.dev${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...posts];
}
