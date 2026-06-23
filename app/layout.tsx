import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { Header } from "@/components/header";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://onurhan.dev"
  ),
  title: {
    default: "Onurhan Demir - Developer Advocate & Frontend Developer at ikas",
    template: "%s | Onurhan Demir",
  },
  description:
    "Onurhan Demir is a Developer Advocate & Frontend Developer at ikas, growing the developer ecosystem and building e-commerce products and experiences. Expert in React, Next.js, TypeScript, and modern web technologies.",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "Onurhan Demir",
    "Onurhan Demir Developer Advocate",
    "Onurhan Demir Frontend Developer",
    "Onurhan Demir ikas",
    "Onurhan Demir React Developer",
    "Onurhan Demir Türkiye",
    "Onurhan Demir Yazılım Geliştirici",
    "Developer Advocate",
    "DevRel",
    "Frontend Developer",
    "ikas developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Developer Advocate Türkiye",
    "Frontend Developer Türkiye",
    "React Developer Türkiye",
  ],
  authors: [{ name: "Onurhan Demir", url: "https://onurhan.dev" }],
  creator: "Onurhan Demir",
  publisher: "Onurhan Demir",
  openGraph: {
    title: "Onurhan Demir - Developer Advocate & Frontend Developer at ikas",
    description:
      "Onurhan Demir is a Developer Advocate & Frontend Developer at ikas, growing the developer ecosystem and building e-commerce products and experiences.",
    url: "https://onurhan.dev",
    siteName: "Onurhan Demir - Developer Advocate",
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
    other: {
      rel: "icon",
      url: "/logo.svg",
    },
  },
  twitter: {
    title: "Onurhan Demir - Developer Advocate & Frontend Developer",
    card: "summary_large_image",
    site: "@onurhan1337",
    creator: "@onurhan1337",
    description:
      "Developer Advocate & Frontend Developer at ikas, growing the developer ecosystem and building e-commerce products and experiences.",
  },
  verification: {
    google: "K1pkJ72cY3DylswXke2MHJGxmjJ91WXwgozcCICvFrU",
  },
  alternates: {
    canonical: "https://onurhan.dev",
    languages: {
      "en-US": "https://onurhan.dev",
      "tr-TR": "https://onurhan.dev",
      "x-default": "https://onurhan.dev",
    },
    types: {
      "application/rss+xml": "https://onurhan.dev/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Onurhan Demir",
    alternateName: "Onurhan",
    jobTitle: "Developer Advocate & Frontend Developer",
    url: "https://onurhan.dev",
    description:
      "Developer Advocate & Frontend Developer at ikas, growing the developer ecosystem and building e-commerce products and experiences. Expert in React, Next.js, TypeScript, and modern web technologies.",
    knowsAbout: [
      "Developer Relations",
      "Developer Advocacy",
      "Frontend Development",
      "Web Development",
      "Developer Experience",
      "E-commerce Development",
      "ikas",
      "Shopify",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Yazılım Geliştirme",
      "Web Geliştirme",
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
    },
    nationality: {
      "@type": "Country",
      name: "Turkey",
      alternateName: "Türkiye",
    },
    workLocation: {
      "@type": "Country",
      name: "Turkey",
      alternateName: "Türkiye",
    },
  };

  return (
    <html lang="en">
      <body className="bg-background text-foreground overflow-y-scroll font-body">
        <Script
          id="person-structured-data"
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <main className="antialiased lg:max-w-2xl md:max-w-full mx-4 mb-40 flex flex-col md:flex-row mt-2 sm:mt-8 lg:mx-auto bg-background">
          <section className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <Header />

            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
