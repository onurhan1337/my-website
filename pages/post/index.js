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
      className="py-12 px-4 md:px-16 mx-auto overflow-hidden"
      style={{ maxWidth: "max(24vw, 768px)" }}
    >
      <h1 className="text-3xl font-bold text-[#0D0E10] mb-6">Writing</h1>
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
