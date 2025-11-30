export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export type SocialButtonProps = {
  href: string;
  children: React.ReactNode;
};

export interface CachedResult<T> {
  metadata: Partial<T>;
  content: string;
  mtime: number;
}

export interface Heading {
  title: string;
  id: string;
}

export interface FormatDateOptions {
  time?: boolean;
}

export interface BlogIndexItem<T> {
  slug: string;
  metadata: Partial<T>;
  readingTime: number;
}

export interface BlogCardProps {
  blog: import("./blog").Blog;
}

export interface BlogListProps {
  blogs: import("./blog").Blog[];
  currentPage: number;
}

export interface PaginationProps {
  blogs: import("./blog").Blog[];
  currentPage: number;
  totalPages: number;
}

export interface ThoughtCardProps {
  thought: import("./thought").Thought & { renderedContent: React.ReactNode };
}

export interface ThoughtsListProps {
  thoughts: (import("./thought").Thought & {
    renderedContent: React.ReactNode;
  })[];
  currentPage: number;
}

export interface ThoughtsPaginationProps {
  allThoughts: (import("./thought").Thought & {
    renderedContent: React.ReactNode;
  })[];
  thoughtsPerPage?: number;
  filter?: string;
}

export interface TableOfContentsProps {
  headings: { title: string; id: string }[];
}

export interface AvailabilityBadgeProps {
  className?: string;
  onClick?: () => void;
}

export interface AvailabilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type ContainerProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
};

export interface CopyCodeProps {
  children: React.ReactNode;
  code?: string;
  className?: string;
}

export interface ExpandableCodeProps {
  children: React.ReactNode;
  className?: string;
  code?: string;
  [key: string]: unknown;
}

export interface CodeExpandModalProps {
  code: string;
  language?: string;
  children: React.ReactNode;
}

export interface LinkCardProps {
  title: string;
  link: string;
}

export interface BuyMeACoffeeProps {
  username: string;
}

export interface CodeStep {
  code: string;
  explanation: string;
  state?: Record<string, unknown>;
  title?: string;
}

export interface CodePlaygroundProps {
  steps: CodeStep[];
  language?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}
