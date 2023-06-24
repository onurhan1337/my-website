import { allPosts, Post } from "contentlayer/generated";
import { Balancer } from "react-wrap-balancer";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { tr } from "date-fns/locale";

import ClapsButton from "@/components/ui/claps";
import { Mdx } from "@/components/mdx";
import Comment from "@/components/comment/comment";

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
  const post = allPosts.find((post: Post) => post.slug === params.slug) as Post;

  return {
    title: post.title,
    description: post.subtitle,
  };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: any) {
  const post: Post = allPosts.find(
    (post: Post) => post.slug === params.slug
  ) as Post;

  if (!post) {
    notFound();
  }

  return (
    <div>
      <section className="post">
        <header>
          <h1 className="font-bold text-3xl font-serif max-w-[650px]">
            <Balancer>{post.title}</Balancer>
          </h1>
          <h2 className="mt-2 text-xl">{post.subtitle}</h2>

          <div className="mt-10 flex items-center space-x-2 opacity-60">
            <time dateTime={post.date}>
              {format(parseISO(post.date), "d LLLL yyyy", {
                locale: tr,
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime.text}</span>
          </div>
        </header>

        <Mdx code={post.body.code} />

        <Comment />
        <div className="mt-20 flex justify-center">
          <ClapsButton url={post.tweetUrl} />
        </div>
      </section>
    </div>
  );
}
