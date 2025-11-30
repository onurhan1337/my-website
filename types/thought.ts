export interface Thought {
  slug: string;
  metadata: {
    type: "code" | "idea" | "quote" | "book";
    createdAt: string;
  };
  content: string;
}

export type ThoughtMetadata = {
  type: "code" | "idea" | "quote" | "book";
  createdAt: string;
};

export interface ThoughtPost {
  metadata: ThoughtMetadata;
  slug: string;
  content: string;
}

export interface ThoughtListItem {
  metadata: ThoughtMetadata;
  slug: string;
}
