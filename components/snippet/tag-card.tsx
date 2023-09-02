import Link from "next/link";
import SnippetTag from "./tag";

const SNIPPET_TAGS = ["nextjs", "react", "typescript", "javascript", "vue"];

const SnippetTagCard = () => {
  return (
    <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 my-4">
      {SNIPPET_TAGS.map((tag) => (
        <Link href={`/snippet/tags/${tag}`} key={tag}>
          <SnippetTag tag={tag} />
        </Link>
      ))}
    </div>
  );
};

export default SnippetTagCard;
