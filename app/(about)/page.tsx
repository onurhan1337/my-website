import Container from "@/components/shared/container";
import Social from "@/components/social";
import { CTA } from "@/components/cta";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Onurhan Demir is a Developer Advocate & Frontend Developer at ikas, specializing in developer ecosystems, UX-focused interfaces, and e-commerce solutions. Based in Turkey.",
  keywords: [
    "Onurhan Demir",
    "Onurhan Demir About",
    "Onurhan Demir Developer Advocate",
    "Onurhan Demir Türkiye",
    "Developer Advocate",
    "Frontend Developer",
    "Full Stack Developer",
    "Software Developer Turkey",
    "Yazılım Geliştirici Türkiye",
    "Full Stack Developer Türkiye",
    "ikas developer",
    "e-commerce development",
    "UX development",
  ],
  openGraph: {
    title: "About | Onurhan Demir",
    description:
      "Onurhan Demir is a Developer Advocate & Frontend Developer at ikas, focused on developer ecosystems, UX, and e-commerce solutions. Based in Turkey.",
    url: "https://onurhan.dev",
  },
  alternates: {
    canonical: "https://onurhan.dev",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Onurhan Demir",
  alternateName: "Onurhan",
  jobTitle: "Developer Advocate & Frontend Developer",
  url: "https://onurhan.dev",
  description:
    "Developer Advocate & Frontend Developer at ikas, focused on developer ecosystems, UX, and e-commerce solutions. Building useful digital products with modern web technologies.",
  knowsAbout: [
    "Software Development",
    "Web Development",
    "Product Development",
    "UX Design",
    "E-commerce Development",
    "Shopify",
    "Ikas",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Yazılım Geliştirme",
    "Web Geliştirme",
    "Ürün Geliştirme",
  ],
  sameAs: [
    "https://github.com/onurhan1337",
    "https://youtube.com/@onurhandev",
    "https://x.com/onurhan1337",
    "https://kizzle.studio",
  ],
  worksFor: {
    "@type": "Organization",
    name: "ikas",
    url: "https://ikas.com",
    description:
      "E-commerce platform company building tools for merchants and developers.",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "TR",
    addressLocality: "Turkey",
    alternateName: "Türkiye",
  },
  nationality: {
    "@type": "Country",
    name: "Turkey",
    alternateName: "Türkiye",
  },
  jobLocation: {
    "@type": "Place",
    name: "Turkey",
    alternateName: "Türkiye",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
      addressLocality: "Turkey",
    },
  },
};

export default function About() {
  const paragraphs = [
    `I'm a Developer Advocate & Frontend Developer at ikas, where I help grow the developer ecosystem and build products and experiences for the platform. My focus is on shipping practical, maintainable solutions that improve the merchant and developer experience.`,
    `I move fast and iterate. Ship, gather feedback, improve, repeat. I write clean, maintainable code while keeping velocity high. Balance matters—quality and speed go hand in hand.`,
    `Outside of work, I'm still experimenting with new tech and building side projects. Always learning, always building, always shipping.`,
  ];

  return (
    <Container
      size="large"
      className="prose prose-zinc container animate-enter"
    >
      <p className="text-lg font-medium tracking-tight mb-8">
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
          <p
            className={`text-[15px] leading-relaxed opacity-80 ${
              index === paragraphs.length - 1 ? "mb-8" : "mb-6"
            }`}
          >
            {paragraph}
          </p>
          {index === 0 && <hr className="border-foreground/10 my-0!" />}
        </div>
      ))}
      <CTA />
      <Social />
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Container>
  );
}