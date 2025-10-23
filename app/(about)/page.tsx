import Container from "@/components/shared/container";
import Social from "@/components/social";
import Script from "next/script";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Onurhan Demir",
  alternateName: "Onurhan",
  jobTitle: "Software Developer",
  url: "https://onurhan.dev",
  description:
    "Software Developer specializing in full-stack development, building comprehensive web applications, B2B SaaS solutions, and micro products. Expert in React, Next.js, TypeScript, and modern web technologies.",
  knowsAbout: [
    "Software Development",
    "Web Development",
    "Full Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "B2B SaaS",
  ],
  sameAs: [
    "https://github.com/onurhan1337",
    "https://youtube.com/@onurhandev",
    "https://read.cv/onurhan",
    "https://twitter.com/onurhan1337",
  ],
};

export default function About() {
  const paragraphs = [
    `I'm a Software Developer who ships full-stack applications. I build fast, scalable products that solve real problems—from B2B SaaS platforms to micro tools people actually use.`,
    `I move fast and iterate. Ship, gather feedback, improve, repeat. I write clean, maintainable code while keeping velocity high. Balance matters—quality and speed go hand in hand.`,
    `When I'm not coding for work, I'm building side projects and experimenting with new tech. Always learning, always building, always shipping.`,
  ];

  return (
    <Container
      size="large"
      className="prose prose-zinc container animate-enter"
    >
      <p className="text-lg font-medium tracking-tight mb-8">Hi, I&apos;m Onurhan.</p>
      {paragraphs.map((paragraph, index) => (
        <div
          key={index}
          style={
            { "--stagger": index } as React.CSSProperties & {
              [key: string]: number;
            }
          }
        >
          <p className={`text-[15px] leading-relaxed opacity-80 ${index === paragraphs.length - 1 ? "mb-8" : "mb-6"}`}>
            {paragraph}
          </p>
          {index === 0 && <hr className="border-foreground/10 my-8" />}
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
