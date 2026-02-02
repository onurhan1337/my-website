"use client";

import { motion } from "framer-motion";
import { WavySeparator } from "@/components/shared/wavy-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";
import IconKizzle from "@/components/shared/icons/kizzle";
import { KizzleCTAButton, KIZZLE_URL } from "@/components/kizzle-cta-button";
import { trackClick } from "@/lib/actions/track-click";
import type { ClickType } from "@/lib/click-tracking";

function handleTrackClick(clickType: ClickType) {
  trackClick(clickType).catch((error) => {
    console.error("Failed to track click:", error);
  });
}

const workExperiences = [
  {
    company: "Kizzle Studio",
    role: "Founder",
    period: "2025 — Present",
    isKizzle: true,
description:
      "Building Kizzle Studio, an e-commerce development studio specializing in Shopify and Ikas platforms. We solve complex commerce challenges and build the technical infrastructure that powers exceptional commerce experiences.",
    achievements: [
      "Building custom Shopify and Ikas theme development solutions.",
      "Developing corporate invoicing workflows and AI-powered analytics tools.",
      "Creating custom integrations and app development for e-commerce platforms.",
      "Providing technical partnership for ambitious commerce brands.",
    ],
  },
  {
    company: "Insider",
    role: "Software Developer",
    period: "2024 — 2025",
    description:
      "At Insider, I was part of the Partner Solution Development team, where I contributed to the development of B2B SaaS solutions tailored to our clients' needs. My role involved collaborating with cross-functional teams to deliver scalable and efficient software solutions that helped businesses grow and optimize their workflows.",
    achievements: [
      "Developed and customized solutions for enterprise clients to enhance their business operations.",
      "Collaborated closely with product managers and designers to deliver user-centric features for B2B applications.",
      "Implemented efficient and maintainable codebases using modern software development practices.",
      "Actively improved existing systems by identifying bottlenecks and implementing optimizations.",
    ],
  },
  {
    company: "Utilify",
    role: "Frontend Engineer",
    period: "2023 — 2024",
    description: (
      <>
        I joined{" "}
        <a
          href="https://utilify.xyz"
          rel="noopener noreferrer"
          className="opacity-80 hover:opacity-100 transition-opacity underline decoration-foreground/30 underline-offset-2"
        >
          Utilify
        </a>{" "}
        to build intuitive interfaces and pages for users and brands.
      </>
    ),
    achievements: [
      "Successfully converted wireframe designs into active working user interface components.",
      "Developed rule-based form builder for brands.",
      "Developed and implemented user and enterprise dashboard interface, including all related pages, for user interaction and data visualization.",
      "Stayed abreast of emerging trends and best practices in front-end development, continually honing skills and exploring innovative solutions to technical challenges.",
      <>
        Developed the{" "}
        <a
          href="https://app.utilify.xyz/ucl"
          rel="noopener noreferrer"
          className="opacity-80 hover:opacity-100 transition-opacity underline decoration-foreground/30 underline-offset-2"
        >
          Campaign page
        </a>{" "}
        for the souvenir NFT distributed for the UCL final in partnership with
        Turkish Airlines.
      </>,
    ],
  },
];

export function WorkClient() {
  return (
    <main>
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="text-[15px] leading-relaxed opacity-80">
          On a mission to create impactful applications that engage users and
          drive value for businesses. Here&apos;s a summary of my journey so
          far.
        </p>
      </motion.header>

      <WavySeparator />

      <section>
        {workExperiences.map((experience, index) => (
          <motion.article
            key={experience.company}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="py-8 border-b border-foreground/10 last:border-0"
          >
            <header className="mb-6">
              <h2 className="font-medium text-xl mb-2 tracking-tight flex items-center gap-2">
                {"isKizzle" in experience && experience.isKizzle && (
                  <IconKizzle size={20} />
                )}
                {experience.company}
              </h2>
              <div className="flex items-center gap-2 text-[13px] opacity-50 tracking-tight">
                <span>{experience.role}</span>
                <span>·</span>
                <time>{experience.period}</time>
              </div>
            </header>

            <p className="text-[15px] leading-relaxed opacity-80 mb-6">
              {experience.description}
            </p>

            <ul className="text-[15px] leading-relaxed opacity-80 space-y-2">
              {experience.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 opacity-40">—</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </section>

      <WavySeparator />

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: workExperiences.length * 0.1 }}
        className="py-8"
      >
        <header className="mb-6">
          <h2 className="font-medium text-xl mb-2 tracking-tight">
            Work With Kizzle Studio
          </h2>
        </header>

        <p className="text-[15px] leading-relaxed opacity-80 mb-6">
          Looking to build or scale your e-commerce business? At Kizzle Studio,
          we specialize in Shopify and Ikas development, building custom
          solutions from corporate invoicing workflows to AI-powered analytics.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <div onClick={() => handleTrackClick("WORK_PAGE:KIZZLE")} className="w-full sm:w-auto">
            <KizzleCTAButton
              text="Kizzle Studio"
              href="https://kizzle.studio"
              className="w-full sm:w-auto justify-center sm:justify-start"
            />
          </div>
          <Button
            asChild
            variant="default"
            className="w-full sm:w-auto justify-center sm:justify-start gap-2 h-[52px] px-5 bg-[#f5f5f5] text-[#262626] tracking-[-0.1px] border border-neutral-200 hover:opacity-90 hover:bg-[#ebebeb]"
          >
            <Link
              href="mailto:onurhandtr@gmail.com"
              className="flex items-center gap-2"
              onClick={() => handleTrackClick("WORK_PAGE:EMAIL")}
            >
              <Mail size={18} />
              <span>Email</span>
            </Link>
          </Button>
        </div>
      </motion.section>
    </main>
  );
}
