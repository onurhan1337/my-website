import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  keywords: string[];
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    if (key.trim() === "keywords") {
      (metadata as Metadata)[key.trim()] = value
        .split(",")
        .map((k) => k.trim());
    } else {
      (metadata as Metadata)[key.trim()] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getReadingTime(content) {
  const wordsPerMinute = 200; // Average reading speed
  const imageReadingTime = 12; // Estimated reading time for an image
  const punctuationReadingTime = 0.05; // Estimated reading time for punctuation

  const wordCount = content.split(" ").length;
  const imageCount = (content.match(/<img /g) || []).length;
  const punctuationCount = (content.match(/[.,:;]/g) || []).length;

  const readingTime =
    wordCount / wordsPerMinute +
    imageCount * imageReadingTime +
    punctuationCount * punctuationReadingTime;

  return Math.ceil(readingTime);
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));
    let readingTime = getReadingTime(content);
    return {
      metadata,
      slug,
      content,
      readingTime,
    };
  });
}

function getAllBlogPostsSorted() {
  const allPosts = getMDXData(path.join(process.cwd(), "content"));
  return [...allPosts].sort(
    (left, right) =>
      new Date(right.metadata.publishedAt).getTime() -
      new Date(left.metadata.publishedAt).getTime()
  );
}

export function getAllBlogPosts() {
  return getAllBlogPostsSorted();
}

export function getBlogPosts(page: number = 1, limit: number = 5) {
  const sortedPosts = getAllBlogPostsSorted();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    total: sortedPosts.length,
    totalPages: Math.ceil(sortedPosts.length / limit),
  };
}
