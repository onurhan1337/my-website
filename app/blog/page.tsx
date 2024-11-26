import { BlogList } from "@/components/blog-list";
import Pagination from "@/components/pagination";
import Container from "@/components/shared/container";
import type { Metadata } from "next";
import { getBlogPosts } from "../db/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default function Blog({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const allBlogs = getBlogPosts();
  const postsPerPage = 5;
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(allBlogs.length / postsPerPage);

  const paginatedBlogs = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <Container size="large">
      <BlogList blogs={paginatedBlogs} currentPage={currentPage} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </Container>
  );
}
