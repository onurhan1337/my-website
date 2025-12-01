import type { z } from "zod";
import type { thoughtMetadataSchema } from "@/lib/schemas";

export type ThoughtMetadata = z.infer<typeof thoughtMetadataSchema>;

export interface ThoughtPost {
  metadata: ThoughtMetadata;
  slug: string;
  content: string;
}

export interface ThoughtCardProps {
  thought: ThoughtPost & {
    renderedContent: React.ReactNode;
  };
}

export interface ThoughtsListProps {
  thoughts: (ThoughtPost & {
    renderedContent: React.ReactNode;
  })[];
  currentPage: number;
}

export interface ThoughtsPaginationProps {
  allThoughts: (ThoughtPost & {
    renderedContent: React.ReactNode;
  })[];
  thoughtsPerPage?: number;
  filter?: string;
}
