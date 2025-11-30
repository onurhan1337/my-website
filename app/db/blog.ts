import path from "path";
import { unstable_cache } from "next/cache";
import type { BlogPost, BlogListItem, PaginatedResult } from "@/types/blog";
import {
  getMDXFiles,
  readMDXFile,
  getReadingTime,
  getMDXMetadata,
} from "@/lib/mdx";
import { validateBlogMetadata } from "@/lib/schemas";

function getMDXData(dir: string): BlogPost[] {
  const mdxFiles = getMDXFiles(dir);
  const posts: BlogPost[] = [];
  const errors: string[] = [];

  for (const file of mdxFiles) {
    try {
      const { metadata, content } = readMDXFile<Record<string, string>>(
        path.join(dir, file)
      );
      const slug = path.basename(file, path.extname(file));

      const validatedMetadata = validateBlogMetadata(metadata);
      const readingTime = getReadingTime(content);
      posts.push({
        metadata: validatedMetadata,
        slug,
        content,
        readingTime,
      });
    } catch (error) {
      errors.push(
        `Invalid metadata in ${file}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  if (errors.length > 0) {
    console.error("Blog post validation errors:", errors);
  }

  return posts.sort(
    (left, right) =>
      new Date(right.metadata.publishedAt).getTime() -
      new Date(left.metadata.publishedAt).getTime()
  );
}

function getMDXListData(dir: string): BlogListItem[] {
  const mdxFiles = getMDXFiles(dir);
  const posts: BlogListItem[] = [];
  const errors: string[] = [];

  for (const file of mdxFiles) {
    try {
      const filePath = path.join(dir, file);
      const { metadata, content } =
        readMDXFile<Record<string, string>>(filePath);
      const slug = path.basename(file, path.extname(file));

      const validatedMetadata = validateBlogMetadata(metadata);
      const readingTime = getReadingTime(content);

      posts.push({
        metadata: validatedMetadata,
        slug,
        readingTime,
      });
    } catch (error) {
      errors.push(
        `Invalid metadata in ${file}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  if (errors.length > 0) {
    console.error("Blog post validation errors:", errors);
  }

  return posts.sort(
    (left, right) =>
      new Date(right.metadata.publishedAt).getTime() -
      new Date(left.metadata.publishedAt).getTime()
  );
}

const getCachedMDXData = unstable_cache(
  async (dir: string): Promise<BlogPost[]> => getMDXData(dir),
  ["blog-posts"],
  {
    revalidate: 3600,
    tags: ["blog-posts"],
  }
);

const getCachedMDXListData = unstable_cache(
  async (dir: string): Promise<BlogListItem[]> => getMDXListData(dir),
  ["blog-posts-list"],
  {
    revalidate: 3600,
    tags: ["blog-posts"],
  }
);

async function getAllBlogPostsSorted(): Promise<BlogPost[]> {
  return getCachedMDXData(path.join(process.cwd(), "content"));
}

async function getAllBlogPostsListSorted(): Promise<BlogListItem[]> {
  return getCachedMDXListData(path.join(process.cwd(), "content"));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return getAllBlogPostsSorted();
}

export async function getBlogPosts(
  page: number = 1,
  limit: number = 5
): Promise<PaginatedResult> {
  const sortedPosts = await getAllBlogPostsListSorted();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    total: sortedPosts.length,
    totalPages: Math.ceil(sortedPosts.length / limit),
  };
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPostsSorted();
  return posts.find((post) => post.slug === slug) ?? null;
}
