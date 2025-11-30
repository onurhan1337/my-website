import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Header } from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://onurhan.dev"
  ),
  title: {
    default: "Onurhan Demir - Software Developer | Full Stack Engineer",
    template: "%s | Onurhan Demir",
  },
  description:
    "Onurhan Demir is a Software Developer specializing in full-stack development, building comprehensive web applications, B2B SaaS solutions, and micro products. Expert in React, Next.js, TypeScript, and modern web technologies. Available for new opportunities.",
  keywords: [
    "Onurhan Demir",
    "Onurhan Demir Software Developer",
    "Onurhan Demir Full Stack",
    "Onurhan Demir React",
    "Onurhan Demir Türkiye",
    "Onurhan Demir Turkey",
    "Onurhan Demir Developer",
    "Onurhan Demir Yazılım Geliştirici",
    "Onurhan",
    "Software Developer",
    "Full Stack Developer",
    "Web Developer",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "B2B SaaS",
    "onurhan.dev",
    "Onurhan Demir available",
    "Yazılım Geliştirici Türkiye",
    "Full Stack Developer Türkiye",
    "React Developer Türkiye",
  ],
  authors: [{ name: "Onurhan Demir", url: "https://onurhan.dev" }],
  creator: "Onurhan Demir",
  publisher: "Onurhan Demir",
  openGraph: {
    title: "Onurhan Demir - Software Developer | Full Stack Engineer",
    description:
      "Onurhan Demir is a Software Developer specializing in full-stack development, building comprehensive web applications, B2B SaaS solutions, and micro products. Available for new opportunities.",
    url: "https://onurhan.dev",
    siteName: "Onurhan Demir - Software Developer",
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    type: "website",
    images: [
      {
        url: "https://onurhan.dev/logo.svg",
        width: 1200,
        height: 630,
        alt: "Onurhan Demir - Software Developer",
      },
    ],
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
    icon: "./logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
    other: {
      rel: "icon",
      url: "/logo.svg",
    },
  },
  twitter: {
    title: "Onurhan Demir - Software Developer",
    card: "summary_large_image",
    site: "@onurhan1337",
    creator: "@onurhan1337",
    description:
      "Software Developer specializing in full-stack development and modern web technologies. Available for new opportunities.",
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
      "https://x.com/onurhan1337",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
    },
    nationality: {
      "@type": "Country",
      name: "Turkey",
    },
  };

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground overflow-y-scroll">
        <Script
          id="person-structured-data"
          type="application/ld+json"
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
