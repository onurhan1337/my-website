import type { CachedResult } from "@/types";
import fs from "fs";
import path from "path";

const frontmatterCache = new Map<
  string,
  CachedResult<Record<string, string>>
>();

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

export function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

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
