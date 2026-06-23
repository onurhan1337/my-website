import Container from "@/components/shared/container";
import { ProjectsClient } from "./projects-client";
import { getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects I've worked on, including e-commerce platforms, web applications, and open source contributions.",
  keywords: [
    "Onurhan Demir Projects",
    "Software Developer Projects",
    "Web Development Projects",
    "Portfolio Projects",
    "Shopify Projects",
    "Next.js Projects",
  ],
  openGraph: {
    title: "Projects | Onurhan Demir",
    description:
      "A collection of projects I've worked on, including e-commerce platforms, web applications, and open source contributions.",
    url: "https://onurhan.dev/projects",
  },
  alternates: {
    canonical: "https://onurhan.dev/projects",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container size="large">
      <ProjectsClient projects={projects} />
    </Container>
  );
}
