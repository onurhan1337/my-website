export type {
  BlogMetadata,
  BlogPost,
  BlogListItem,
  PaginatedResult,
  BlogCardProps,
  BlogListProps,
  PaginationProps,
} from "./blog";

export type {
  ThoughtMetadata,
  ThoughtPost,
  ThoughtCardProps,
  ThoughtsListProps,
  ThoughtsPaginationProps,
} from "./thought";

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export type SocialButtonProps = {
  href: string;
  children: React.ReactNode;
};

export interface CachedResult<T> {
  metadata: T;
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

export interface TableOfContentsProps {
  headings: Heading[];
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
