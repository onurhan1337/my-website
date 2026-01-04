import path from "path";
import type { ThoughtPost } from "@/types/thought";
import { getMDXFiles, readMDXFile } from "@/lib/mdx";
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

const thoughtsDir = path.join(process.cwd(), "thoughts");

async function getAllThoughtsSorted(): Promise<ThoughtPost[]> {
  return getMDXData(thoughtsDir);
}

export async function getThoughts(): Promise<ThoughtPost[]> {
  return getAllThoughtsSorted();
}

export async function getThought(slug: string): Promise<ThoughtPost | null> {
  const thoughts = await getAllThoughtsSorted();
  return thoughts.find((thought) => thought.slug === slug) ?? null;
}
