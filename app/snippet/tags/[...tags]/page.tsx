import Link from "next/link";
import { allSnippets } from "contentlayer/generated";
import { ArrowLeftIcon } from "lucide-react";

import SnippetCard from "@/components/snippet/card";
import SnippetTag from "@/components/snippet/tag";
import { Button } from "@/components/ui/button";

interface SnippetsWithFilterProps {
  params: {
    tags: string;
  };
}

function getTags({ params }: SnippetsWithFilterProps) {
  const lastTag = params.tags[params.tags.length - 1];

  const snippets = allSnippets.filter((snippet) => {
    return snippet.categories && snippet.categories.includes(lastTag);
  });

  return snippets;
}

export default function SnippetsWithFilter({
  params,
}: SnippetsWithFilterProps) {
  const filteredSnippets = getTags({ params });

  const lastTag = params.tags[params.tags.length - 1];

  return (
    <section className="px-3">
      <div className="mx-auto flex max-w-2xl flex-col items-center flex-wrap justify-center gap-2">
        <h1 className={"text-2xl font-serif dark:text-zinc-200"}>Snippets</h1>
        <h6
          className={"my-3 text-sm font-medium leading-none dark:text-zinc-200"}
        >
          A collection of solutions to small problems I&apos;ve faced in the
          past.
        </h6>

        {params.tags && (
          <Link href={"/snippet"}>
            <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 my-4">
              <SnippetTag tag={lastTag} />
            </div>
          </Link>
        )}

        {filteredSnippets &&
          filteredSnippets.map((snippet) => (
            <div
              className="flex flex-col items-start justify-center gap-2 w-full"
              key={snippet.title}
            >
              <SnippetCard data={snippet} />
            </div>
          ))}

        {filteredSnippets && filteredSnippets.length === 0 && (
          <div className="flex flex-col text-center justify-between bg-zinc-50 dark:bg-zinc-900 shadow-inline rounded-lg w-full gap-4 p-6">
            <p className="text-md font-medium leading-none">
              No snippets found for &apos;{lastTag}&apos;
            </p>
            <div>
              <Link href={"/snippet"}>
                <Button variant={"link"} size={"sm"} className="gap-2">
                  <ArrowLeftIcon size={16} />
                  Go Back
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div>
          <Link href={"/snippet"}>
            <Button
              size={"sm"}
              variant={"ghost"}
              className="gap-2 dark:text-zinc-300 dark:hover:text-zinc-400"
            >
              <ArrowLeftIcon size={16} />
              See All
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
