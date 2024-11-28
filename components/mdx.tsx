import { ArrowUpRight, Coffee } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { highlight } from "sugar-high";
import { CopyCode } from "./copy-code";
import { ExpandableCode } from "./expandable-code";

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th
      key={index}
      className="border-b border-neutral-200 dark:border-neutral-800
        bg-secondary dark:bg-secondary/50
        px-4 py-2 text-left
        text-sm font-semibold text-secondary-foreground dark:text-secondary-foreground
        first:pl-6 last:pr-6 whitespace-nowrap"
    >
      {header}
    </th>
  ));

  let rows = data.rows.map((row, index) => (
    <tr
      key={index}
      className="group transition-colors hover:bg-muted/50 dark:hover:bg-muted/50 text-start tracking-wide"
    >
      {row.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className="border-b border-neutral-200 dark:border-neutral-800
            px-4 py-2 text-xs text-muted-foreground
            first:pl-6 last:pr-6"
        >
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="not-prose relative my-4 overflow-hidden rounded-lg border border-border bg-card overflow-x-auto">
      <table className="w-full border-collapse m-0">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody className="divide-y divide-border">{rows}</tbody>
      </table>
    </div>
  );
}

function CustomLink(props) {
  let href = props.href;

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

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Callout(props) {
  return (
    <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}

function ProsCard({ title, pros }) {
  return (
    <div className="border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-4 w-full">
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="flex font-medium items-baseline mb-2">
            <div className="h-4 w-4 mr-2">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsCard({ title, cons }) {
  return (
    <div className="border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-6 w-full">
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="flex font-medium items-baseline mb-2">
            <div className="h-4 w-4 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkCardList({ cards }) {
  return (
    <div
      className=" bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6
    my-4 w-full gap-12"
    >
      {cards.map((card) => (
        <LinkCard key={card.title} title={card.title} link={card.link} />
      ))}
    </div>
  );
}

function LinkCard({ title, link }) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline"
    >
      <button className="flex flex-row justify-start items-center w-full cursor-pointer ">
        <div
          className="h-4 w-4
        mr-2"
        >
          <ArrowUpRight size={16} className="text-blue-700" />
        </div>
        <span className="font-medium text-blue-600 ">{title}</span>
      </button>
    </Link>
  );
}

function Code({ children, ...props }) {
  if (typeof children === "string" && !children.includes("\n")) {
    return <code {...props}>{children}</code>;
  }

  let codeHTML = highlight(children);
  const isLongCode = children.split("\n").length > 15;

  const codeBlock = (
    <pre className="!border-none">
      <code dangerouslySetInnerHTML={{ __html: codeHTML }} />
    </pre>
  );

  const wrappedCode = (
    <div className="bg-zinc-50 dark:bg-neutral-950 rounded-lg">
      <CopyCode code={children} className="p-4">
        {codeBlock}
      </CopyCode>
    </div>
  );

  if (isLongCode) {
    return (
      <ExpandableCode className="prose-pre:my-0">{wrappedCode}</ExpandableCode>
    );
  }

  return wrappedCode;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Component = ({ children }) => {
    let slug = slugify(children);
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

interface BuyMeACoffeeProps {
  username: string;
}

export function BuyMeACoffee({ username }: BuyMeACoffeeProps) {
  return (
    <div className="not-prose my-8 flex items-center justify-center">
      <Link
        href={`https://buymeacoffee.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
      >
        <Coffee className="h-4 w-4" />
        <span>support content</span>
      </Link>
    </div>
  );
}

const components = {
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
  LinkCardList,
  BuyMeACoffee,
};

export function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
