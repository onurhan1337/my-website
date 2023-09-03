"use client";

import NextLink from "next/link";

import { format, parseISO } from "date-fns";
import { tr } from "date-fns/locale";
import { Post } from "@/.contentlayer/generated";

const PostCard = (props: { data: Post }) => {
  const { data } = props;

  return (
    <article>
      <header>
        <NextLink href={`/post/${data.slug}`}>
          <h4 className="text-lg font-semibold cursor-pointer">{data.title}</h4>
        </NextLink>
        <p className="text-sm my-1">{data.subtitle}</p>
      </header>
      <footer className="flex items-center mt-1 space-x-2">
        <time dateTime={data.date} className="text-sm">
          {format(parseISO(data.date!), "d LLLL yyyy", {
            locale: tr,
          })}
        </time>
        <span className="opacity-60">·</span>
        <span className="text-sm">{data.readingTime.text}</span>
      </footer>
    </article>
  );
};

export default PostCard;
