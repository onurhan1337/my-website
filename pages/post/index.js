import BlogCard from "../../components/card/blogCard";
import { allPosts } from "contentlayer/generated";
import { pick } from "@contentlayer/client";

export async function getStaticProps() {
  const posts = allPosts.map(post => pick(post, ["title", "date", "slug"]));

  return { props: { posts } };
}

const BlogPage = ({ posts }) => {
  return (
    <div className="max-w-screen-sm px-6 py-12 mx-auto overflow-hidden">
      <h1 className="text-2xl font-bold text-black border-2 border-black text-center rounded-full py-2 dark:text-white dark:border-white mb-6">
        Writing
      </h1>
      <div className="flex flex-col gap-y-6">
        {posts?.map(({ slug, date, title }) => (
          <BlogCard key={slug} title={title} date={date} slug={slug}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
