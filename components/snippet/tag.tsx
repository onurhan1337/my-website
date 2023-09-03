import { cn } from "@/lib/utils";

const TAG_COLORS = {
  default: "bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300",
  javascript:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  typescript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  nextjs: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  react:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  vue: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300",
};

const SnippetTag = ({ tag }: { tag: string }) => {
  const isDefault = !TAG_COLORS[tag.toLowerCase() as keyof typeof TAG_COLORS];

  return (
    <span
      className={cn(
        "inline-block px-4 py-2 text-sm font-medium rounded-full hover:underline cursor-pointer capitalize hover:backdrop:blur-2xl transition-all duration-200 ease-in-out",
        isDefault
          ? TAG_COLORS.default
          : TAG_COLORS[tag.toLowerCase() as keyof typeof TAG_COLORS]
      )}
    >
      {tag}
    </span>
  );
};

export default SnippetTag;
