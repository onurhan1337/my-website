import { allSnippets, Snippet } from "@/.contentlayer/generated";
import SnippetCard from "./card";

// get all snippets from the content layer
function getData() {
  return allSnippets.map((snippet: Snippet) => snippet);
}

const SnippetList = () => {
  const snippets = getData();

  return (
    <div>
      {snippets.map((snippet) => (
        <SnippetCard data={snippet} key={snippet.title} />
      ))}
    </div>
  );
};

export default SnippetList;
