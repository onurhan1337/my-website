import path from "path";
import type { BlogPost, BlogListItem, PaginatedResult } from "@/types/blog";
import { getMDXFiles, readMDXFile, getReadingTime } from "@/lib/mdx";
import { validateBlogMetadata } from "@/lib/schemas";

function getBlogPostsData(
  dir: string,
  includeContent: boolean = true
): BlogPost[] | BlogListItem[] {
  const mdxFiles = getMDXFiles(dir);
  const posts: (BlogPost | BlogListItem)[] = [];
  const errors: string[] = [];

  for (const file of mdxFiles) {
    try {
      const filePath = path.join(dir, file);
      const { metadata, content } =
        readMDXFile<Record<string, string>>(filePath);
      const slug = path.basename(file, path.extname(file));

      const validatedMetadata = validateBlogMetadata(metadata);
      const readingTime = getReadingTime(content);

      if (includeContent) {
        (posts as BlogPost[]).push({
          metadata: validatedMetadata,
          slug,
          content,
          readingTime,
        });
      } else {
        (posts as BlogListItem[]).push({
          metadata: validatedMetadata,
          slug,
          readingTime,
        });
      }
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

  return (posts as BlogPost[] | BlogListItem[]).sort(
    (left, right) =>
      new Date(right.metadata.publishedAt).getTime() -
      new Date(left.metadata.publishedAt).getTime()
  );
}

const contentDir = path.join(process.cwd(), "content");

async function getAllBlogPostsSorted(): Promise<BlogPost[]> {
  return getBlogPostsData(contentDir, true) as BlogPost[];
}

async function getAllBlogPostsListSorted(): Promise<BlogListItem[]> {
  return getBlogPostsData(contentDir, false) as BlogListItem[];
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
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const mdxFiles = getMDXFiles(contentDir);

  if (!mdxFiles.includes(`${slug}.mdx`)) {
    return null;
  }

  try {
    const { metadata, content } = readMDXFile<Record<string, string>>(filePath);
    const validatedMetadata = validateBlogMetadata(metadata);
    const readingTime = getReadingTime(content);

    return {
      metadata: validatedMetadata,
      slug,
      content,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}
