import NextLink from "next/link";
import { format, parseISO } from "date-fns";
import { tr } from "date-fns/locale";

const BlogCard = ({ title, date, slug }) => {
  return (
    <NextLink href={`/post/${slug}`} legacyBehavior>
      <div>
        <a className="flex flex-col gap-y-1 rounded-md p-2.5 -m-2.5 transition-colors dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-gray-700/20 cursor-pointer">
          <span className="font-normal word-break">{title}</span>
          <div className="text-sm font-light text-gray-500 word-break">
            <time dateTime={date}>
              {format(parseISO(date), "d LLLL yyyy", {
                locale: tr,
              })}
            </time>
          </div>
        </a>
      </div>
    </NextLink>
  );
};

export default BlogCard;
