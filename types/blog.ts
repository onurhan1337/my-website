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
