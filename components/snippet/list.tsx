import { allSnippets, Snippet } from "@/.contentlayer/generated";
import SnippetCard from "./card";

// get all snippets from the content layer
function getData() {
  return allSnippets.map((snippet: Snippet) => snippet);
}

const SnippetList = () => {
  const snippets: Snippet[] = getData();

  return (
    <section>
      {snippets.map((snippet: Snippet) => (
        <SnippetCard data={snippet} key={snippet.title} />
      ))}
    </section>
  );
};

export default SnippetList;
