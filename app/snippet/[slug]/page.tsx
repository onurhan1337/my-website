import { allSnippets, Snippet } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Balancer } from "react-wrap-balancer";

import { Mdx } from "@/components/mdx";
import ClapsButton from "@/components/ui/claps";
import SnippetTag from "@/components/snippet/tag";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  const snippet = allSnippets.find(
    (snippet: Snippet) => snippet.slug === params.slug
  ) as Snippet;

  if (!snippet) {
    throw new Error("Snippet not found");
  }

  return {
    title: snippet.title,
    description: snippet.description,
    logo: snippet.logo,
    categories: snippet.categories,
  };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allSnippets.map((snippet) => ({
    slug: snippet.slug,
  }));
}

const SnippetCode = ({ params }: { params: Props["params"] }) => {
  const snippet: Snippet = allSnippets.find(
    (snippet: Snippet) => snippet.slug === params.slug
  ) as Snippet;

  if (!snippet) {
    notFound();
  }

  return (
    <article>
      <div className="flex flex-col sm:flex-row items-center justify-start gap-3 my-4">
        <div className="rounded-md overflow-hidden inline-flex">
          <Image
            src={snippet.logo}
            alt={snippet.title}
            width={40}
            height={40}
          />
        </div>
        <h1 className="text-4xl font-bold dark:text-slate-100">
          {snippet.title}
        </h1>
      </div>
      <span className="text-sm text-gray-600 dark:text-zinc-400 font-medium leading-none">
        <Balancer>{snippet.description}</Balancer>
      </span>
      <div>
        {snippet.categories && (
          <div className="flex flex-row items-center justify-start gap-2 mt-4">
            {snippet.categories.map((category) => (
              <SnippetTag key={category} tag={category} />
            ))}
          </div>
        )}
      </div>
      <Mdx code={snippet.body.code} />

      <div className="mt-20 flex flex-col items-center justify-center dark:text-slate-700">
        <ClapsButton url={snippet.slug} />
        <div className="gap-2 my-4">
          <Link href={"/snippet"}>
            <Button size={"sm"} variant={"outline"} className="gap-2">
              <ArrowLeftIcon size={16} />
              See All
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SnippetCode;
