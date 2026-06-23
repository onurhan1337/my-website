import Image from "next/image";
import Container from "@/components/shared/container";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrowserFrame } from "@/components/browser-frame";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Onurhan Demir`,
      description: project.description,
      url: `https://onurhan.dev/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container size="large">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-foreground/70 transition-colors mb-10"
      >
        <ArrowLeft size={15} />
        Projects
      </Link>

      <div className="relative aspect-video rounded-lg overflow-hidden bg-foreground/[0.02] mb-10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>

      <h1 className="text-2xl lg:text-3xl font-normal tracking-normal leading-relaxed text-foreground/85 mb-6">
        {project.title}
      </h1>

      <div className="text-[15px] leading-relaxed opacity-80 mb-14 space-y-4">
        {project.longDescription.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {project.liveUrl && (
        <div className="mb-14">
          <h2 className="text-base font-normal tracking-normal text-foreground/50 mb-6">
            Live Preview
          </h2>
          <BrowserFrame url={project.liveUrl} title={project.title} />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-14">
        {project.liveUrl && (
          <Button asChild>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="secondary" asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Github size={15} />
              Source
            </a>
          </Button>
        )}
      </div>

      {project.highlights.length > 0 && (
        <section className="mb-14">
          <h2 className="text-base font-normal tracking-normal text-foreground/50 mb-6">
            Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="p-5 rounded-lg border border-foreground/10"
              >
                <div className="text-xs font-normal tracking-normal text-foreground/40 mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-[15px] font-normal text-foreground/85 mb-2">
                  {h.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-foreground/50">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.screenshots.length > 0 && (
        <section className="mb-14">
          <h2 className="text-base font-normal tracking-normal text-foreground/50 mb-6">
            Screenshots
          </h2>
          <div className="grid grid-cols-1 gap-5">
            {project.screenshots.map((src, i) => (
              <div
                key={i}
                className="relative aspect-video rounded-lg overflow-hidden bg-foreground/[0.02] border border-foreground/10"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
