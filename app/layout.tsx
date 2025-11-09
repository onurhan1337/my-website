import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    "Onurhan Demir is a Software Developer at Insider specializing in full-stack development, building comprehensive web applications, B2B SaaS solutions, and micro products. Expert in React, Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "Onurhan Demir",
    "Onurhan",
    "Software Developer",
    "Full Stack Developer",
    "Web Developer",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Insider Developer",
    "B2B SaaS",
    "onurhan.dev",
  ],
  authors: [{ name: "Onurhan Demir", url: "https://onurhan.dev" }],
  creator: "Onurhan Demir",
  publisher: "Onurhan Demir",
  openGraph: {
    title: "Onurhan Demir - Software Developer | Full Stack Engineer",
    description:
      "Onurhan Demir is a Software Developer at Insider specializing in full-stack development, building comprehensive web applications, B2B SaaS solutions, and micro products.",
    url: "https://onurhan.dev",
    siteName: "Onurhan Demir - Software Developer",
    locale: "en_US",
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
  twitter: {
    title: "Onurhan Demir - Software Developer",
    card: "summary_large_image",
    site: "@onurhan1337",
    creator: "@onurhan1337",
    description:
      "Software Developer at Insider specializing in full-stack development and modern web technologies.",
  },
  verification: {
    google: "K1pkJ72cY3DylswXke2MHJGxmjJ91WXwgozcCICvFrU",
  },
  alternates: {
    canonical: "https://onurhan.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground overflow-y-scroll">
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
