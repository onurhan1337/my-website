import BlogList from "@/components/post/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read about my thoughts on frontend development, design and more.",
};

const Blog = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-serif">Blog</h1>
      <BlogList />
    </div>
  );
};

export default Blog;
