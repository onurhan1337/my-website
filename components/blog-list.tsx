"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BlogCard } from "./blog-card";
import { Blog } from "@/types/blog";

interface BlogListProps {
  blogs: Blog[];
  currentPage: number;
}

export function BlogList({ blogs, currentPage }: BlogListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {blogs.map((blog) => (
          <motion.div key={blog.slug} variants={item}>
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
