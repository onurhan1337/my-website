import type { CachedResult } from "@/types";
import fs from "fs";
import path from "path";

const frontmatterCache = new Map<
  string,
  CachedResult<Record<string, string>>
>();

/**
 * Parses a frontmatter block string into a metadata object.
 * Extracts key-value pairs from YAML-like frontmatter format.
 *
 * @param block - The frontmatter block content (without the `---` delimiters)
 * @returns A typed metadata object with parsed key-value pairs
 * @template T - The type of the metadata object (must extend Record<string, string>)
 *
 * @example
 * ```typescript
 * const block = "title: My Post\ndate: 2024-01-01";
 * const metadata = parseFrontmatterBlock<{ title: string; date: string }>(block);
 * // Returns: { title: "My Post", date: "2024-01-01" }
 * ```
 */
function parseFrontmatterBlock<T extends Record<string, string>>(
  block: string
): T {
  const metadata = {} as T;

  for (const line of block.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const colonIndex = trimmed.indexOf(": ");
    if (colonIndex === -1) continue;

    const key = trimmed.slice(0, colonIndex).trim();
    const value = trimmed
      .slice(colonIndex + 2)
      .trim()
      .replace(/^["']|["']$/g, "");

    metadata[key as keyof T] = value as T[keyof T];
  }

  return metadata;
}

/**
 * Parses frontmatter and content from a complete MDX file string.
 * Extracts metadata from the YAML frontmatter block and separates it from the content.
 *
 * @param fileContent - The complete MDX file content including frontmatter
 * @returns An object containing the parsed metadata and the content (without frontmatter)
 * @throws {Error} If the frontmatter block is not found or invalid
 * @template T - The type of the metadata object (must extend Record<string, string>)
 *
 * @example
 * ```typescript
 * const fileContent = `---
 * title: My Post
 * date: 2024-01-01
 * ---
 *
 * This is the content.`;
 * const { metadata, content } = parseFrontmatter<{ title: string; date: string }>(fileContent);
 * ```
 */
export function parseFrontmatter<T extends Record<string, string>>(
  fileContent: string
): { metadata: T; content: string } {
  const frontmatterRegex = /^\uFEFF?---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error("Invalid frontmatter: frontmatter block not found");
  }

  const [, frontMatterBlock, content] = match;
  const metadata = parseFrontmatterBlock<T>(frontMatterBlock);

  return { metadata, content: content.trim() };
}

/**
 * Retrieves all MDX files from a specified directory.
 *
 * @param dir - The directory path to search for MDX files
 * @returns An array of MDX filenames (without directory path), or an empty array if the directory doesn't exist
 *
 * @example
 * ```typescript
 * const files = getMDXFiles("./content");
 * // Returns: ["post1.mdx", "post2.mdx", ...]
 * ```
 */
export function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Reads and parses an MDX file with caching support.
 * Uses file modification time to invalidate cache when the file changes.
 *
 * @param filePath - The full path to the MDX file
 * @returns An object containing the parsed metadata and content
 * @template T - The type of the metadata object (must extend Record<string, string>)
 *
 * @example
 * ```typescript
 * const { metadata, content } = readMDXFile<{ title: string }>("./content/post.mdx");
 * ```
 */
export function readMDXFile<T extends Record<string, string>>(
  filePath: string
): { metadata: T; content: string } {
  const stats = fs.statSync(filePath);
  const mtime = stats.mtimeMs;
  const cached = frontmatterCache.get(filePath);

  if (cached && cached.mtime === mtime) {
    return {
      metadata: cached.metadata as T,
      content: cached.content,
    };
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const result = parseFrontmatter<T>(rawContent);

  frontmatterCache.set(filePath, {
    metadata: result.metadata as Record<string, string>,
    content: result.content,
    mtime,
  });

  return result;
}

/**
 * Extracts only the metadata from an MDX file without reading the full content.
 * More efficient than `readMDXFile` when you only need metadata.
 *
 * @param filePath - The full path to the MDX file
 * @returns The parsed metadata object
 * @throws {Error} If the frontmatter block is not found or invalid
 * @template T - The type of the metadata object (must extend Record<string, string>)
 *
 * @example
 * ```typescript
 * const metadata = getMDXMetadata<{ title: string; date: string }>("./content/post.mdx");
 * // Returns: { title: "My Post", date: "2024-01-01" }
 * ```
 */
export function getMDXMetadata<T extends Record<string, string>>(
  filePath: string
): T {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const frontmatterRegex = /^\uFEFF?---\s*\n([\s\S]*?)\n---/;
  const match = frontmatterRegex.exec(rawContent);

  if (!match) {
    throw new Error("Invalid frontmatter: frontmatter block not found");
  }

  return parseFrontmatterBlock<T>(match[1]);
}

/**
 * Calculates the estimated reading time for content in minutes.
 * Takes into account word count, images, and punctuation to provide a more accurate estimate.
 *
 * @param content - The content string to analyze (typically HTML or markdown)
 * @returns The estimated reading time in minutes (rounded up), or 0 if content is invalid
 *
 * @remarks
 * - Assumes 200 words per minute reading speed
 * - Adds 0.2 minutes per image
 * - Adds 0.008 minutes per punctuation mark
 * - Returns 0 for empty, null, or non-string inputs
 *
 * @example
 * ```typescript
 * const time = getReadingTime("<p>This is a blog post with some content.</p>");
 * // Returns: 1 (rounded up from calculated time)
 * ```
 */
export function getReadingTime(content: string): number {
  if (!content || typeof content !== "string") {
    return 0;
  }

  const wordsPerMinute = 200;
  const words = content.match(/\b\w+\b/g);
  const images = content.match(/<img\s/g);
  const punctuation = content.match(/[.,:;!?]/g);

  const wordCount = words?.length ?? 0;
  const imageCount = images?.length ?? 0;
  const punctuationCount = punctuation?.length ?? 0;

  const readingTime =
    wordCount / wordsPerMinute + imageCount * 0.2 + punctuationCount * 0.008;

  return Math.ceil(readingTime);
}
