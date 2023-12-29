import NextLink from "next/link";
import { Snippet } from "@/.contentlayer/generated";
import Image from "next/image";

interface SnippetCardProps {
  data: Snippet;
}

const SnippetCard = (props: SnippetCardProps) => {
  const { data: snippet } = props;
  return (
    <NextLink href={`snippet/${snippet.slug}`}>
      <article
        className="border-2 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 rounded-xl p-6 my-4 space-y-3"
        key={snippet.title}
      >
        <div className="rounded-md overflow-hidden inline-flex">
          <Image
            src={snippet.logo}
            alt={snippet.title}
            width={40}
            height={40}
          />
        </div>
        <h2 className="text-lg text-zinc-600 dark:text-zinc-300 font-semibold">
          {snippet.title}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-tight">
          {snippet.description}
        </p>
      </article>
    </NextLink>
  );
};

export default SnippetCard;
