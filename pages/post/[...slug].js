import { useMDXComponent } from "next-contentlayer/hooks";
import { allPosts } from "contentlayer/generated";
import Claps from "@upstash/claps";

export async function getStaticPaths() {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps(params) {
  const post = allPosts.find((post) => post.slug === params?.slug)
  
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

  const Component = useMDXComponent(post.body.code);


  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <article>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <time className="py-2 text-gray-500 text-sm">
          {post.date}
        </time>
        <p className="py-2 text-gray-800">{post.frontMatter.subtitle}</p>
        <hr className="my-4" />
      </article>
      <div className="prose dark:prose-invert prose-p:font-jakarta">
        <Component
          components={{
            ...MDXComponents,
          }}
        />
      </div>
      <div className="fixed z-50">
        <Claps fixed="left" replyUrl={post.slug} />
      </div>
    </div>
  );
};



export default PostPage;
