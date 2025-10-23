export interface Thought {
  slug: string;
  metadata: {
    type: "code" | "idea" | "quote" | "book";
    createdAt: string;
  };
  content: string;
}
