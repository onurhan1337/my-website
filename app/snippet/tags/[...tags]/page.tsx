import { allSnippets } from "contentlayer/generated";

import SnippetCard from "@/components/snippet/card";
import SnippetTag from "@/components/snippet/tag";

interface SnippetsWithFilterProps {
  params: {
    tags: string;
  };
}

// url: /snippet/tags/typeScript     ↓↓↓    params.tags = ["typeScript"]
function getTags({ params }: SnippetsWithFilterProps) {
  const lastTag = params.tags[params.tags.length - 1];

  const snippets = allSnippets.filter((snippet) => {
    console.log("deneme: ", snippet.categories?.includes(lastTag));
    return snippet.categories && snippet.categories.includes(lastTag);
  });

  return snippets;
}

export default function SnippetsWithFilter({
  params,
}: SnippetsWithFilterProps) {
  const filteredSnippets = getTags({ params });

  // url: /snippet/tags/typeScript     ↓↓↓
  // params.tags = ["typeScript"] -> lastTag = "typeScript"
  const lastTag = params.tags[params.tags.length - 1];

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center flex-wrap justify-center gap-2">
      <h1 className={"text-2xl font-serif"}>Snippets</h1>
      <h6 className={"my-3 text-sm font-medium leading-none"}>
        A collection of solutions to small problems I&apos;ve faced in the past.
      </h6>

      {params.tags && (
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 my-4">
          <SnippetTag tag={lastTag} />
        </div>
      )}

      {filteredSnippets &&
        filteredSnippets.map((snippet) => (
          <SnippetCard data={snippet} key={snippet.title} />
        ))}

      {filteredSnippets && filteredSnippets.length === 0 && (
        <div className="mx-auto bg-red-100 dark:bg-red-300 flex max-w-2xl flex-wrap justify-center px-3 py-1.5 rounded-full gap-2 my-4">
          <h3 className="text-lg text-red-800 font-semibold">
            No snippets found for tag: <b>{lastTag}</b>
          </h3>
        </div>
      )}
    </section>
  );
}
