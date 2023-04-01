import Head from "next/head";
import { useState, useEffect } from "react";
import { pick } from "@contentlayer/client";
import { allPosts } from "contentlayer/generated";
import { motion } from "framer-motion";
import BlogCard from "../../components/card/blogCard";
import SkeletonCardList from "../../components/card/skeleton";

export async function getStaticProps() {
  const posts = allPosts.map(post => pick(post, ["title", "date", "slug"]));

  return { props: { posts } };
}

const BlogPage = ({ posts }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Blog | Onurhan Demir</title>
        <meta name="description" content="see all my blog posts here" />
        <meta property="og:image" content="/avatar.png" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className="max-w-screen-sm px-6 py-12 mx-auto overflow-hidden"
      >
        <h1 className="text-2xl font-bold text-black border-2 border-black text-center rounded-full py-2 dark:text-white dark:border-white mb-6">
          Writing
        </h1>
        {loading ? (
          <SkeletonCardList count={posts.length} />
        ) : (
          <>
            <div className="flex flex-col gap-y-6">
              {posts?.map(({ slug, date, title }) => (
                <BlogCard
                  key={slug}
                  title={title}
                  date={date}
                  slug={slug}
                ></BlogCard>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default BlogPage;
