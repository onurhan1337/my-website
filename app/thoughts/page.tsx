import { ThoughtsClient } from "./thoughts-client";
import { getThoughts } from "@/app/db/thoughts";
import Container from "@/components/shared/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Quick thoughts, ideas, code snippets, quotes, and book notes.",
};

export default async function ThoughtsPage() {
  const thoughts = getThoughts();

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
