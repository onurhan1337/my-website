import BlogCard from "../../components/card/blogCard";
import { allPosts } from "contentlayer/generated";

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return {
    props: {
      posts: posts.map((post) => {
        const { body, type, _raw, ...rest } = post;
        return rest;
      }),
    },
  };
}


const BlogPage = ({ posts }) => {
  return (
    <div
      className="py-12 px-4 md:px-16 mx-auto overflow-hidden"
      style={{ maxWidth: "max(24vw, 768px)" }}
    >
      <h1 className="text-3xl font-bold text-[#0D0E10] mb-6">Writing</h1>
      <div className="flex flex-col gap-y-6">
        {posts.map((post) => (
          <BlogCard
            key={post.url}
            title={post.frontMatter.title}
            date={post.frontMatter.date}
            slug={post.url}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
