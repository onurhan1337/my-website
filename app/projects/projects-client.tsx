"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";

interface ProjectsClientProps {
  projects: Project[];
}

const tabs = ["all", "e-commerce", "open-source", "web", "saas"] as const;
type Tab = (typeof tabs)[number];

const tabLabels: Record<Tab, string> = {
  all: "All",
  "e-commerce": "Commerce",
  "open-source": "Open source",
  web: "Web",
  saas: "SaaS",
};

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filtered =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <div>
      <nav aria-label="Filter" className="mb-12 flex flex-wrap gap-5 text-small">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
            className={cn(
              "transition-colors duration-150",
              activeTab === tab ? "text-ink" : "text-ink-2 hover:text-ink"
            )}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </nav>

      <div className="divide-y divide-rule">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
