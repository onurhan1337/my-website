import path from "path";
import { unstable_cache } from "next/cache";
import type {
  Thought,
  ThoughtPost,
  ThoughtListItem,
  ThoughtMetadata,
} from "@/types/thought";
import { getMDXFiles, readMDXFile, getMDXMetadata } from "@/lib/mdx";
import { validateThoughtMetadata } from "@/lib/schemas";

function getMDXData(dir: string): ThoughtPost[] {
  const mdxFiles = getMDXFiles(dir);
  const thoughts: ThoughtPost[] = [];
  const errors: string[] = [];

  for (const file of mdxFiles) {
    try {
      const { metadata, content } = readMDXFile<Record<string, string>>(
        path.join(dir, file)
      );
      const slug = path.basename(file, path.extname(file));

      const validatedMetadata = validateThoughtMetadata(metadata);
      thoughts.push({
        metadata: validatedMetadata,
        slug,
        content,
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
    console.error("Thought validation errors:", errors);
  }

  return thoughts.sort(
    (left, right) =>
      new Date(right.metadata.createdAt).getTime() -
      new Date(left.metadata.createdAt).getTime()
  );
}

function getMDXListData(dir: string): ThoughtListItem[] {
  const mdxFiles = getMDXFiles(dir);
  const thoughts: ThoughtListItem[] = [];
  const errors: string[] = [];

  for (const file of mdxFiles) {
    try {
      const filePath = path.join(dir, file);
      const metadata = getMDXMetadata<Record<string, string>>(filePath);
      const slug = path.basename(file, path.extname(file));

      const validatedMetadata = validateThoughtMetadata(metadata);
      thoughts.push({
        metadata: validatedMetadata,
        slug,
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
    console.error("Thought validation errors:", errors);
  }

  return thoughts.sort(
    (left, right) =>
      new Date(right.metadata.createdAt).getTime() -
      new Date(left.metadata.createdAt).getTime()
  );
}

const getCachedThoughtsData = unstable_cache(
  async (dir: string): Promise<ThoughtPost[]> => getMDXData(dir),
  ["thoughts"],
  {
    revalidate: 3600,
    tags: ["thoughts"],
  }
);

const getCachedThoughtsListData = unstable_cache(
  async (dir: string): Promise<ThoughtListItem[]> => getMDXListData(dir),
  ["thoughts-list"],
  {
    revalidate: 3600,
    tags: ["thoughts"],
  }
);

export async function getThoughts(): Promise<Thought[]> {
  return getCachedThoughtsData(path.join(process.cwd(), "thoughts"));
}

export async function getThoughtsList(): Promise<ThoughtListItem[]> {
  return getCachedThoughtsListData(path.join(process.cwd(), "thoughts"));
}

export async function getThought(slug: string): Promise<ThoughtPost | null> {
  const thoughts = await getCachedThoughtsData(
    path.join(process.cwd(), "thoughts")
  );
  return thoughts.find((thought) => thought.slug === slug) ?? null;
}

export async function getThoughtsByType(
  type: ThoughtMetadata["type"]
): Promise<Thought[]> {
  const thoughts = await getThoughts();
  return thoughts.filter((thought) => thought.metadata.type === type);
}
