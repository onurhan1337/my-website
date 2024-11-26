export interface Blog {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
  };
  content: string;
  readingTime: number;
}
