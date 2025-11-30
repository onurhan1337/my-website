import fs from "fs";
import path from "path";
import type { CachedResult, BlogIndexItem } from "@/types";

const frontmatterCache = new Map<
  string,
  CachedResult<Record<string, unknown>>
>();

export function parseFrontmatter<T extends Record<string, unknown>>(
  fileContent: string
): { metadata: Partial<T>; content: string } {
  let i = 0;
  const len = fileContent.length;

  if (fileContent.charCodeAt(0) === 0xfeff) i++;

  if (
    fileContent.charCodeAt(i) !== 45 ||
    fileContent.charCodeAt(i + 1) !== 45 ||
    fileContent.charCodeAt(i + 2) !== 45
  ) {
    throw new Error("Invalid frontmatter: frontmatter block not found");
  }

  i += 3;
  while (
    i < len &&
    (fileContent.charCodeAt(i) === 32 ||
      fileContent.charCodeAt(i) === 10 ||
      fileContent.charCodeAt(i) === 13)
  )
    i++;

  const metadata: Partial<T> = {};
  let key = "";
  let value = "";
  let parsingKey = true;

  while (i < len) {
    const char = fileContent[i];
    const code = fileContent.charCodeAt(i);

    if (
      code === 45 &&
      fileContent.charCodeAt(i + 1) === 45 &&
      fileContent.charCodeAt(i + 2) === 45
    ) {
      if (key && value) {
        metadata[key as keyof T] = value.replace(
          /^['"](.*)['"]$/,
          "$1"
        ) as T[keyof T];
      }
      i += 3;
      while (
        i < len &&
        (fileContent.charCodeAt(i) === 32 ||
          fileContent.charCodeAt(i) === 10 ||
          fileContent.charCodeAt(i) === 13)
      )
        i++;
      const content = fileContent.slice(i).trim();
      return { metadata, content };
    }

    if (code === 10 || code === 13) {
      if (key && value) {
        metadata[key as keyof T] = value.replace(
          /^['"](.*)['"]$/,
          "$1"
        ) as T[keyof T];
      }
      key = "";
      value = "";
      parsingKey = true;
      i++;
      continue;
    }

    if (parsingKey) {
      if (code === 58 && fileContent.charCodeAt(i + 1) === 32) {
        parsingKey = false;
        i += 2;
        continue;
      }
      key += char;
    } else {
      value += char;
    }

    i++;
  }

  throw new Error("Invalid frontmatter: closing delimiter not found");
}

export function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export function readMDXFile<T extends Record<string, unknown>>(
  filePath: string
): { metadata: Partial<T>; content: string } {
  const stats = fs.statSync(filePath);
  const mtime = stats.mtimeMs;
  const cached = frontmatterCache.get(filePath) as CachedResult<T> | undefined;

  if (cached && cached.mtime === mtime) {
    return { metadata: cached.metadata as Partial<T>, content: cached.content };
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const result = parseFrontmatter<T>(rawContent);

  frontmatterCache.set(filePath, { ...result, mtime } as CachedResult<
    Record<string, unknown>
  >);

  return result;
}

export function getMDXMetadata<T extends Record<string, unknown>>(
  filePath: string
): Partial<T> {
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.allocUnsafe(1024);
  let bytesRead = 0;
  let content = "";
  let foundEnd = false;

  try {
    while (bytesRead < 4096 && !foundEnd) {
      const read = fs.readSync(fd, buffer, 0, buffer.length, bytesRead);
      if (read === 0) break;
      content += buffer.toString("utf-8", 0, read);
      bytesRead += read;
      if (content.includes("---", 4)) {
        foundEnd = true;
      }
    }
  } finally {
    fs.closeSync(fd);
  }

  const { metadata } = parseFrontmatter<T>(content);
  return metadata;
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  let wordCount = 0;
  let imageCount = 0;
  let punctuationCount = 0;
  let inWord = false;
  const len = content.length;

  for (let i = 0; i < len; i++) {
    const code = content.charCodeAt(i);

    if (
      code === 60 &&
      content.charCodeAt(i + 1) === 105 &&
      content.charCodeAt(i + 2) === 109 &&
      content.charCodeAt(i + 3) === 103 &&
      content.charCodeAt(i + 4) === 32
    ) {
      imageCount++;
      i += 4;
      continue;
    }

    if (code === 46 || code === 44 || code === 58 || code === 59) {
      punctuationCount++;
      continue;
    }

    const isWhitespace =
      code === 32 || code === 10 || code === 13 || code === 9;

    if (!isWhitespace && !inWord) {
      wordCount++;
      inWord = true;
    } else if (isWhitespace && inWord) {
      inWord = false;
    }
  }

  const readingTime =
    wordCount / wordsPerMinute + imageCount * 12 + punctuationCount * 0.05;

  return Math.ceil(readingTime);
}

export function buildBlogIndex<T extends Record<string, unknown>>(
  dir: string
): BlogIndexItem<T>[] {
  const files = getMDXFiles(dir);
  const index: BlogIndexItem<T>[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(dir, file);
    const { metadata, content } = readMDXFile<T>(filePath);
    const readingTime = getReadingTime(content);

    index.push({ slug, metadata, readingTime });
  }

  return index;
}

export function saveBlogIndex<T extends Record<string, unknown>>(
  dir: string,
  outputPath: string
): void {
  const index = buildBlogIndex<T>(dir);
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), "utf-8");
}
