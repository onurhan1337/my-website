import { ThoughtsClient } from "./thoughts-client";
import { getThoughts } from "@/app/db/thoughts";
import Container from "@/components/shared/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts",
  description:
    "Quick thoughts, ideas, code snippets, quotes, and book notes by Onurhan Demir. Insights on software development, technology, and learning.",
  keywords: [
    "Onurhan Demir Thoughts",
    "Onurhan Demir Ideas",
    "Software Development Thoughts",
    "Tech Notes",
  ],
  openGraph: {
    title: "Thoughts | Onurhan Demir",
    description:
      "Quick thoughts, ideas, code snippets, quotes, and book notes by Onurhan Demir.",
    url: "https://onurhan.dev/thoughts",
  },
  alternates: {
    canonical: "https://onurhan.dev/thoughts",
  },
};

export const revalidate = 3600;

export default async function ThoughtsPage() {
  const thoughts = await getThoughts();

  const thoughtsWithContent = await Promise.all(
    thoughts.map(async (thought) => {
      const { ThoughtsMDX } = await import("@/components/thoughts-mdx");
      return {
        ...thought,
        renderedContent: <ThoughtsMDX source={thought.content} />,
      };
    })
  );

  return (
    <Container size="large">
      <ThoughtsClient thoughts={thoughtsWithContent} />
    </Container>
  );
}
