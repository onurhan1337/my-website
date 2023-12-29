import BlogList from "@/components/post/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post",
  description:
    "Read about my thoughts on frontend development, design and more.",
};

const Post = () => {
  return (
    <div>
      <h1 className="text-2xl font-serif text-center dark:text-zinc-200">
        Posts and notes
      </h1>
      <BlogList />
    </div>
  );
};

export default Post;
