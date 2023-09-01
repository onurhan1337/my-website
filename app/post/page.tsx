import BlogList from "@/components/post/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read about my thoughts on frontend development, design and more.",
};

const Blog = () => {
  return (
    <div>
      <h1 className="text-2xl font-serif">Posts and notes</h1>
      <BlogList />
    </div>
  );
};

export default Blog;
