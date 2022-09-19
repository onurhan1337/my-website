import BlogCard from "../../components/card/blogCard";
import { allPosts } from "contentlayer/generated";
import { pick } from "@contentlayer/client";

export async function getStaticProps() {
  const posts = allPosts.map((post) => pick(post, ["title", "date", "slug"]));

  return { props: { posts } };
}

const BlogPage = ({ posts }) => {
  
  return (
    <div
      className="max-w-screen-sm px-6 py-12 mx-auto overflow-hidden"
    >
      <h1 className="text-3xl font-bold text-[#0D0E10] dark:text-zinc-500 mb-6">Writing</h1>
      <div className="flex flex-col gap-y-6">
        {posts?.map(({slug, date, title}) => (
          <BlogCard
            key={slug}
            title={title}
            date={date}
            slug={slug}
          >
          </BlogCard>
        ))}
      </div>
    </div>
    );
};

export default BlogPage;