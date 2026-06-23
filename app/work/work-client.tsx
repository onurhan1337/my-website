"use client";

import { motion } from "framer-motion";
import { WavySeparator } from "@/components/shared/wavy-separator";

const workExperiences = [
  {
    company: "ikas",
    role: "Developer Advocate & Frontend Developer",
    period: "Jun 2026 — Present",
    description:
      "At ikas, I work across Developer Relations and frontend, helping grow the developer ecosystem around the app store, theme store, and Studio. I bridge developers, agencies, and the product teams while building toward a better developer and merchant experience.",
    achievements: [
      "Supporting the growth of the ikas developer ecosystem across the app store, theme store, and Studio.",
      "Improving the Studio experience with frontend and component work that makes stores easier to customize.",
      "Producing technical content, examples, and guides to help developers build apps, themes, and components on ikas.",
      "Exploring AI-assisted Studio ideas to help non-technical merchants solve their own needs.",
      "Bringing developer and merchant feedback back to the product teams to shape the platform.",
    ],
  },
  {
    company: "Kizzle Studio",
    role: "Software Developer",
    period: "2025 — 2026",
    description:
      "Software Developer at Kizzle Studio, an e-commerce development studio specializing in Shopify and Ikas platforms. We build custom solutions from corporate invoicing workflows to AI-powered analytics for ambitious commerce brands.",
    achievements: [
      "Building custom Shopify and Ikas theme development solutions.",
      "Developing corporate invoicing workflows and AI-powered analytics for e-commerce platforms.",
      "Creating custom integrations and app development for e-commerce platforms.",
      "Providing technical partnership for ambitious commerce brands.",
    ],  
  },
  {
    company: "Insider One",
    role: "Software Developer",
    period: "2024 — 2025",
    description:
      "At Insider One, I was part of the Partner Solution Development team, where I contributed to the development of B2B SaaS solutions tailored to our clients' needs. My role involved collaborating with cross-functional teams to deliver scalable and efficient software solutions that helped businesses grow and optimize their workflows.",
    achievements: [
      "Developed and customized solutions for enterprise clients to enhance their business operations.",
      "Collaborated closely with product managers and designers to deliver user-centric features for B2B applications.",
      "Implemented efficient and maintainable codebases using modern software development practices.",
      "Actively improved existing systems by identifying bottlenecks and implementing optimizations.",
    ],
  },
  {
    company: "ION Labs",
    role: "Frontend Engineer",
    period: "Jan 2024 — Sep 2024",
    description:
      "Worked as a contract Frontend Engineer at ION Labs, building end-to-end applications with Next.js, Docker, and PostgreSQL that served thousands of users. Collaborated on internal tools and data platforms to streamline operations.",
    achievements: [
      "Built scalable full-stack applications using Next.js, Docker, and PostgreSQL serving thousands of users.",
      "Developed data visualization dashboards that improved decision-making for management teams.",
      "Integrated Paraşüt accounting APIs, reducing manual workload for client financial operations.",
      "Improved application performance and user experience through targeted frontend optimizations.",
      "Developed the mobile version of the internal operations tool using React Native + Expo, enabling field teams to access customer data, create records, and track tasks on the go.",
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
        className="mb-2"
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
    </main>
  );
}
