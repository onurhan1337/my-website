const link =
  "underline decoration-ink-3 decoration-1 underline-offset-[3px] transition-colors hover:decoration-ink";

const workExperiences = [
  {
    company: "ikas",
    role: "Developer Advocate & Frontend Developer",
    period: "2026 — Present",
    description:
      "I work across Developer Relations and frontend, helping grow the developer ecosystem around the app store, theme store, and Studio. I bridge developers, agencies, and product teams while building toward a better developer and merchant experience.",
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
      "An e-commerce development studio specializing in Shopify and ikas. We build custom solutions from corporate invoicing workflows to AI-powered analytics for ambitious commerce brands.",
    achievements: [
      "Building custom Shopify and ikas theme development solutions.",
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
      "Part of the Partner Solution Development team, contributing to B2B SaaS solutions tailored to client needs. Collaborated with cross-functional teams to deliver scalable software that helped businesses grow and optimize their workflows.",
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
    period: "2024",
    description:
      "Contract Frontend Engineer building end-to-end applications with Next.js, Docker, and PostgreSQL that served thousands of users. Collaborated on internal tools and data platforms to streamline operations.",
    achievements: [
      "Built scalable full-stack applications using Next.js, Docker, and PostgreSQL serving thousands of users.",
      "Developed data visualization dashboards that improved decision-making for management teams.",
      "Integrated Paraşüt accounting APIs, reducing manual workload for client financial operations.",
      "Improved application performance and user experience through targeted frontend optimizations.",
      "Developed the mobile version of the internal operations tool using React Native and Expo.",
    ],
  },
  {
    company: "Utilify",
    role: "Frontend Engineer",
    period: "2023 — 2024",
    description: (
      <>
        Joined{" "}
        <a href="https://utilify.xyz" rel="noopener noreferrer" className={link}>
          Utilify
        </a>{" "}
        to build intuitive interfaces and pages for users and brands.
      </>
    ),
    achievements: [
      "Converted wireframe designs into working user interface components.",
      "Developed a rule-based form builder for brands.",
      "Built the user and enterprise dashboard interface, including all related pages, for interaction and data visualization.",
      <>
        Developed the{" "}
        <a href="https://app.utilify.xyz/ucl" rel="noopener noreferrer" className={link}>
          campaign page
        </a>{" "}
        for the souvenir NFT distributed for the UCL final in partnership with
        Turkish Airlines.
      </>,
    ],
  },
];

export function WorkClient() {
  return (
    <div className="divide-y divide-rule">
      {workExperiences.map((experience) => (
        <article key={experience.company} className="py-12 first:pt-0">
          <header>
            <h2 className="text-body font-medium">{experience.company}</h2>
            <p className="mt-1 text-caption text-ink-3">
              <span>{experience.role}</span>
              <span className="mx-2">·</span>
              <time>{experience.period}</time>
            </p>
          </header>

          <p className="mt-6 text-ink-2">{experience.description}</p>

          <ul className="mt-6 space-y-2 text-ink-2">
            {experience.achievements.map((achievement, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-ink-3" aria-hidden="true">
                  —
                </span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
