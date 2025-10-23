import { ArrowUpRight, Coffee } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
} from "./interactive-components";
import { CodePlayground } from "./interactive-components/code-playground";

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th
      key={index}
      className="border-b border-neutral-200
        bg-secondary
        px-4 py-2 text-left
        text-sm font-semibold text-secondary-foreground
        first:pl-6 last:pr-6 whitespace-nowrap"
    >
      {header}
    </th>
  ));

  let rows = data.rows.map((row, index) => (
    <tr
      key={index}
      className="group transition-colors hover:bg-muted/50 text-start tracking-wide"
    >
      {row.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className="border-b border-neutral-200
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
    <div className="my-4 text-xs flex items-start">
      <div className="flex items-center w-4 mr-4">↪</div>
      <div className="w-full callout text-muted-foreground tracking-tight">
        {props.children}
      </div>
    </div>
  );
}

function ProsCard({ title, pros }) {
  return (
    <div
      className="border border-neutral-200
                    bg-white
                    rounded-lg p-6 my-4 w-full"
    >
      {title && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <h4 className="font-medium text-neutral-900">
            {title}
          </h4>
        </div>
      )}
      <div className="space-y-2">
        {pros.map((pro, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-neutral-700 leading-relaxed">
              {pro}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsCard({ title, cons }) {
  return (
    <div
      className="border border-neutral-200
                    bg-white
                    rounded-lg p-6 my-4 w-full"
    >
      {title && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <h4 className="font-medium text-neutral-900">
            {title}
          </h4>
        </div>
      )}
      <div className="space-y-2">
        {cons.map((con, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-neutral-700 leading-relaxed">
              {con}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkCardList({ cards }) {
  return (
    <div
      className=" bg-neutral-100 rounded-xl p-6
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
    <div className="bg-zinc-50 rounded-lg">
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
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 transition-colors hover:bg-neutral-100"
      >
        <Coffee className="h-5 w-5 text-orange-600" />
        <span>Support Content</span>
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
  TaskSimulator,
  RaceConditionVisualizer,
  GoroutineScheduler,
  ChannelSimulator,
  UnbufferedChannelDemo,
  CodePlayground,
  RealtimeAudioFlow,
};

export function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
