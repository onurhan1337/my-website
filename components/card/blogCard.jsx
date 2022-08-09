import Link from "next/link";

const BlogCard = ({ title, date, slug }) => {
  return (
    <Link href={slug}>
      <div>
        <a className="flex flex-col gap-y-1 rounded-md p-2.5 -m-2.5 transition-colors hover:bg-gray-100 cursor-pointer">
          <span className="font-normal word-break">{title}</span>
          <div className="text-sm font-light text-gray-500 word-break">
            <time dateTime="2022-12-30T00:00:00.000Z">{date}</time>
          </div>
        </a>
      </div>
    </Link>
  );
};

export default BlogCard;
