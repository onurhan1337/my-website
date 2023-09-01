import { Metadata } from "next";

import { allPosts, Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "./card";

export const metadata: Metadata = {
  title: "Posts",
  description: "My all posts",
};

// Sort posts by date in descending order
function getData() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return posts.map((post: Post) => post);
}

const BlogList = () => {
  const posts: Post[] = getData();

  return (
    <section className="flex flex-col space-y-8 py-4 text-neutral-800 dark:text-neutral-200">
      {posts.map((post: Post) => (
        <PostCard key={post._id} data={post} />
      ))}
    </section>
  );
};

export default BlogList;
