import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink">
        <Script
          id="person-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <div className="mx-auto w-full max-w-[640px] px-6 pb-20 pt-10 sm:pt-14">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
