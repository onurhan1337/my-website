import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { highlight } from "sugar-high";
import { CopyCode } from "./copy-code";
import { ExpandableCode } from "./expandable-code";
import {
  TaskSimulator,
  RaceConditionVisualizer,
  GoroutineScheduler,
  ChannelSimulator,
  UnbufferedChannelDemo,
  RealtimeAudioFlow,
  ApiRequest,
  FlowSteps,
  ProcessSteps,
} from "./interactive-components";
import { DocsExplorer } from "./docs-explorer";
import { CodePlayground } from "./interactive-components/code-playground";

interface TableData {
  headers: string[];
  rows: string[][];
}

import type { LinkCardProps, BuyMeACoffeeProps } from "@/types";

const LONG_CODE_THRESHOLD = 15;

function Table({ data }: { data: TableData }) {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href || "";

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  return (
    <Image
      {...props}
      alt={props.alt || ""}
      className="rounded-md"
      loading={props.loading || "lazy"}
      quality={props.quality || 85}
    />
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="border-l border-rule pl-5 text-small text-ink-2">
      {children}
    </aside>
  );
}

function ListCard({ title, items }: { title?: string; items: string[] }) {
  return (
    <div className="rounded-md bg-well px-6 py-5 text-small">
      {title && <p className="font-medium">{title}</p>}
      <ul className="mt-2 space-y-1.5 text-ink-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span className="text-ink-3" aria-hidden="true">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProsCard({ title, pros }: { title?: string; pros: string[] }) {
  return <ListCard title={title} items={pros} />;
}

function ConsCard({ title, cons }: { title?: string; cons: string[] }) {
  return <ListCard title={title} items={cons} />;
}

function LinkCardList({ cards }: { cards: LinkCardProps[] }) {
  return (
    <ul className="space-y-1.5 text-small">
      {cards.map((card) => (
        <li key={card.title}>
          <LinkCard title={card.title} link={card.link} />
        </li>
      ))}
    </ul>
  );
}

function LinkCard({ title, link }: LinkCardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {title} ↗
    </a>
  );
}

function normalizeCodeString(children: ReactNode): string {
  if (React.isValidElement(children)) {
    return String(
      (children.props as { children?: unknown })?.children ?? children
    );
  }
  return typeof children === "string" ? children : String(children);
}

function Code({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: unknown;
}) {
  const codeString = normalizeCodeString(children);

  if (!codeString.includes("\n")) {
    return (
      <code {...props}>{codeString}</code>
    );
  }

  const codeHTML = highlight(codeString);
  const lineCount = codeString.split("\n").length;
  const isLongCode = lineCount > LONG_CODE_THRESHOLD;

  const wrappedCode = (
    <CopyCode code={codeString}>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: codeHTML }} />
      </pre>
    </CopyCode>
  );

  if (isLongCode) {
    return <ExpandableCode code={codeString}>{wrappedCode}</ExpandableCode>;
  }

  return wrappedCode;
}

function slugify(str: ReactNode): string {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Component = ({ children }: { children: ReactNode }) => {
    const slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };
  Component.displayName = `Heading${level}`;
  return Component;
}

export function BuyMeACoffee({ username }: BuyMeACoffeeProps) {
  return (
    <p className="text-small">
      <a
        href={`https://buymeacoffee.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Support this content
      </a>
    </p>
  );
}

function Pre({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

const components = {
  pre: Pre,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  Image: RoundedImage,
  Callout,
  ProsCard,
  ConsCard,
  code: Code,
  Table,
  LinkCard,
  LinkCardList,
  BuyMeACoffee,
  TaskSimulator,
  RaceConditionVisualizer,
  GoroutineScheduler,
  ChannelSimulator,
  UnbufferedChannelDemo,
  CodePlayground,
  RealtimeAudioFlow,
  ApiRequest,
  FlowSteps,
  ProcessSteps,
  DocsExplorer,
};

export function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
