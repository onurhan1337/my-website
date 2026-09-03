import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
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

function publicFileExists(file: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", file));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const screenshots = project.screenshots.filter(publicFileExists);

  const external = [
    project.liveUrl && { label: "Visit site", href: project.liveUrl },
    project.githubUrl && { label: "Source", href: project.githubUrl },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <article>
      <header>
        <h1 className="text-title">{project.title}</h1>
        <p className="mt-3 text-ink-2">{project.description}</p>
        {external.length > 0 && (
          <p className="mt-6 flex gap-5 text-small">
            {external.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {item.label}
              </a>
            ))}
          </p>
        )}
      </header>

      {publicFileExists(project.image) && (
        <div className="relative mt-12 aspect-video overflow-hidden rounded-md bg-well">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, 640px"
          />
        </div>
      )}

      <div className="mt-12 space-y-6 text-ink-2">
        {project.longDescription.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {project.highlights.length > 0 && (
        <section className="mt-16">
          <h2 className="text-caption text-ink-3">Highlights</h2>
          <dl className="mt-4 divide-y divide-rule">
            {project.highlights.map((highlight) => (
              <div key={highlight.title} className="py-4">
                <dt className="font-medium">{highlight.title}</dt>
                <dd className="mt-1 text-ink-2">{highlight.description}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {screenshots.length > 0 && (
        <section className="mt-16 space-y-6">
          {screenshots.map((src, index) => (
            <div
              key={src}
              className="relative aspect-video overflow-hidden rounded-md bg-well"
            >
              <Image
                src={src}
                alt={`${project.title} screenshot ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 640px"
              />
            </div>
          ))}
        </section>
      )}

      <p className="mt-16 text-small">
        <Link href="/projects" className="link">
          All projects
        </Link>
      </p>
    </article>
  );
}
