export interface Blog {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    keywords: string[];
    image?: string;
  };
  content: string;
  readingTime: number;
}

export type BlogMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  keywords: string[];
  image?: string;
};

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
  posts: Blog[];
  total: number;
  totalPages: number;
}
