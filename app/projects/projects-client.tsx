"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WavySeparator } from "@/components/shared/wavy-separator";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";

interface ProjectsClientProps {
  projects: Project[];
}

const tabs = ["all", "open-source", "e-commerce", "web", "saas"] as const;
type Tab = (typeof tabs)[number];

const tabLabels: Record<Tab, string> = {
  all: "All",
  "open-source": "Open Source",
  "e-commerce": "E-Commerce",
  web: "Web",
  saas: "SaaS",
};

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filtered =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 150, damping: 10 },
    },
  };

  return (
    <div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-2 text-[15px] leading-relaxed opacity-80"
      >
        A collection of projects I&apos;ve worked on.
      </motion.p>

      <div className="flex items-center gap-6 mt-8 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm transition-colors ${
              activeTab === tab
                ? "text-foreground/85"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      <section className="mb-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeTab}
        >
          {filtered.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
