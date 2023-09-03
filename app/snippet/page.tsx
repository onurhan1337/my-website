import { Metadata } from "next";

import SnippetTagCard from "@/components/snippet/tag-card";
import SnippetList from "@/components/snippet/list";

export const metadata: Metadata = {
  title: "Snippets",
  description:
    "A collection of solutions to small problems I've faced in the past.",
  openGraph: {
    title: "Snippets",
    description:
      "A collection of solutions to small problems I've faced in the past.",
  },
};

const Snippets = () => {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center flex-wrap justify-center gap-2">
      <h1 className={"text-2xl font-serif"}>Snippets</h1>
      <h6 className={"my-3 text-sm font-medium leading-none"}>
        A collection of solutions to small problems I&apos;ve faced in the past.
      </h6>

      <SnippetTagCard />

      <SnippetList />
    </section>
  );
};

export default Snippets;
