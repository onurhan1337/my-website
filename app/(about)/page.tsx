import Container from "@/components/shared/container";
import Social from "@/components/social";
import Script from "next/script";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Onurhan Demir",
  jobTitle: "Software Developer",
  worksFor: {
    "@type": "Organization",
    name: "Insider",
  },
  url: "https://onurhan.dev",
  sameAs: [
    "https://github.com/onurhan1337",
    "https://youtube.com/@onurhandev",
    "https://read.cv/onurhan",
  ],
};

export default function About() {
  const paragraphs = [
    <>
      As a Software Developer at{" "}
      <span className="font-medium decoration-wavy underline decoration-from-font text-emerald-950 decoration-emerald-500 dark:text-emerald-50 dark:decoration-emerald-400 tracking-tight">
        Insider
      </span>
      , I focus on developing comprehensive applications that deliver value
      across various aspects of software. My expertise bridges the gap between
      design and functionality, reflecting my passion for creating seamless user
      experiences.
    </>,
    `Driven by a love for software development, I thrive on leveraging user
     feedback to enhance products and optimize workflows. I find particular
     excitement in building solutions that streamline processes and contribute
     to impactful projects.`,
    `Outside of work, I enjoy crafting minimalist
     digital tools that address web-related challenges and improve
     development efficiency.`,
  ];

  return (
    <Container
      size="large"
      className="prose prose-zinc dark:prose-invert
      text-zinc-800 dark:text-zinc-200 container animate-enter"
    >
      <p className="my-5 text-zinc-800 dark:text-zinc-200">
        Hi, I&apos;m Onurhan.
      </p>
      {paragraphs.map((paragraph, index) => (
        <div
          key={index}
          style={
            { "--stagger": index } as React.CSSProperties & {
              [key: string]: number;
            }
          }
        >
          <p className={index === paragraphs.length - 1 ? "mb-8" : ""}>
            {paragraph}
          </p>
          {index === 0 && <hr />}
        </div>
      ))}
      <Social />
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Container>
  );
}
