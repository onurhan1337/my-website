import type { z } from "zod";
import type { blogMetadataSchema } from "@/lib/schemas";

export type BlogMetadata = z.infer<typeof blogMetadataSchema>;

export interface BlogPost {
  metadata: BlogMetadata;
  slug: string;
  content: string;
  readingTime: number;
}

export interface BlogListItem {
  metadata: BlogMetadata;
  slug: string;
  readingTime: number;
}

export interface PaginatedResult {
  posts: BlogListItem[];
  total: number;
  totalPages: number;
}

export interface BlogCardProps {
  blog: BlogListItem;
}

export interface BlogListProps {
  blogs: BlogListItem[];
  currentPage: number;
}

export interface PaginationProps {
  blogs: BlogListItem[];
  currentPage: number;
  totalPages: number;
}
