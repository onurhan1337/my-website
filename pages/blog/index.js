import BlogCard from "../../components/card/blogCard";
import { getAllNodes } from "next-mdx";

const BlogPage = ({ posts }) => {
  return (
    <div
      className="py-12 px-4 md:px-16 mx-auto overflow-hidden"
      style={{ maxWidth: "max(24vw, 768px)" }}
    >
      <h1 className="text-3xl font-semibold text-[#0D0E10] mb-6">Writing</h1>
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

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  };
}

export default BlogPage;
