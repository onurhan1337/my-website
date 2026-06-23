"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  return (
    <div
      className="group rounded-lg border border-foreground/10 hover:border-foreground/20 transition-all duration-200 bg-background overflow-hidden cursor-pointer"
      onClick={() => router.push(`/projects/${project.slug}`)}
    >
      <div className="relative aspect-video bg-foreground/[0.02] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-base font-normal tracking-normal text-foreground/85 group-hover:text-foreground/50 transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed opacity-70 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <time className="text-[13px] text-foreground/40 tracking-normal">
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </time>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-foreground/30 hover:text-foreground/60 transition-colors"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}