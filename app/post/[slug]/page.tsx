import { allPosts, Post } from "contentlayer/generated";
import { Balancer } from "react-wrap-balancer";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { tr } from "date-fns/locale";

import ClapsButton from "@/components/ui/claps";
import { Mdx } from "@/components/mdx";

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
          <h1 className="font-bold text-3xl font-mono max-w-[650px] dark:text-zinc-300">
            <Balancer>{post.title}</Balancer>
          </h1>
          <h2 className="mt-2 text-xl dark:text-zinc-300">{post.subtitle}</h2>

          <div className="mt-10 flex items-center space-x-2 opacity-60 dark:text-zinc-300">
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

        <div className="mt-20 flex justify-center dark:text-slate-700">
          <ClapsButton url={post.tweetUrl} />
        </div>
      </section>
    </div>
  );
}
