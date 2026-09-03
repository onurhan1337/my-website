import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="py-8 first:pt-0">
      <h2 className="text-body font-medium">
        <Link href={`/projects/${project.slug}`} className="link-ink">
          {project.title}
        </Link>
      </h2>
      <p className="mt-1 text-ink-2">{project.description}</p>
      <p className="mt-3 text-caption text-ink-3">
        <time dateTime={project.date}>
          {new Date(project.date).getFullYear()}
        </time>
      </p>
    </article>
  );
}
