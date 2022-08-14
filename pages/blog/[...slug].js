import { getMdxNode, getMdxPaths } from "next-mdx/server";
import { useHydrate } from "next-mdx/client";
import { mdxComponents } from "../../components/mdx-components";
import Claps from "@upstash/claps";

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("post"),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const post = await getMdxNode("post", context);

  if (!post) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  return {
    props: {
      post,
    },
  };
}

const PostPage = ({ post }) => {

  const content = useHydrate(post, {
    components: mdxComponents,
  });


  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <article>
        <h1 className="text-4xl font-bold">{post.frontMatter.title}</h1>
        <time className="py-2 text-gray-500 text-sm">
          {post.frontMatter.date}
        </time>
        <p className="py-2 text-gray-800">{post.frontMatter.excerpt}</p>
        <hr className="my-4" />
      </article>
      <div className="prose dark:prose-invert prose-p:font-jakarta">{content}</div>
      <div className="fixed z-50">
        <Claps fixed="left" replyUrl={post.url} />
      </div>
    </div>
  );
};



export default PostPage;
