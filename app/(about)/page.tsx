import Container from "@/components/shared/container";
import Social from "@/components/social";
import { KizzleCTA } from "@/components/kizzle-cta";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Onurhan Demir is a Software Developer and Founder of Kizzle Studio, specializing in full-stack development, building comprehensive web applications, B2B SaaS solutions, and e-commerce platforms. Based in Turkey.",
  keywords: [
    "Onurhan Demir",
    "Onurhan Demir About",
    "Onurhan Demir Software Developer",
    "Onurhan Demir Türkiye",
    "Kizzle Studio",
    "Software Developer",
    "Full Stack Developer",
    "Software Developer Turkey",
    "Yazılım Geliştirici Türkiye",
    "Full Stack Developer Türkiye",
  ],
  openGraph: {
    title: "About | Onurhan Demir",
    description:
      "Onurhan Demir is a Software Developer and Founder of Kizzle Studio, specializing in full-stack development, building comprehensive web applications, B2B SaaS solutions, and e-commerce platforms.",
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
  jobTitle: "Software Developer & Founder",
  url: "https://onurhan.dev",
  description:
    "Software Developer and Founder of Kizzle Studio, specializing in full-stack development, building comprehensive web applications, B2B SaaS solutions, and e-commerce platforms. Expert in React, Next.js, TypeScript, and modern web technologies.",
  knowsAbout: [
    "Software Development",
    "Web Development",
    "Full Stack Development",
    "E-commerce Development",
    "Shopify",
    "Ikas",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "B2B SaaS",
    "Yazılım Geliştirme",
    "Web Geliştirme",
    "Full Stack Geliştirme",
  ],
  sameAs: [
    "https://github.com/onurhan1337",
    "https://youtube.com/@onurhandev",
    "https://x.com/onurhan1337",
    "https://kizzle.studio",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Kizzle Studio",
    url: "https://kizzle.studio",
    description:
      "E-commerce development studio specializing in Shopify, Ikas, and custom solutions.",
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
    `I'm a Software Developer and Founder of Kizzle Studio, an e-commerce development studio specializing in Shopify and Ikas platforms. We build custom solutions from corporate invoicing workflows to AI-powered analytics for ambitious commerce brands.`,
    `I move fast and iterate. Ship, gather feedback, improve, repeat. I write clean, maintainable code while keeping velocity high. Balance matters—quality and speed go hand in hand.`,
    `When I'm not building Kizzle Studio, I'm experimenting with new tech and building side projects. Always learning, always building, always shipping.`,
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
          {index === 0 && <hr className="border-foreground/10 my-8" />}
        </div>
      ))}
      <KizzleCTA />
      <Social />
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Container>
  );
}
