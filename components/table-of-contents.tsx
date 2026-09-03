import type { TableOfContentsProps } from "@/types";

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="mb-16 text-small">
      <p className="text-caption text-ink-3">Contents</p>
      <ol className="mt-3 space-y-1.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="link">
              {heading.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
