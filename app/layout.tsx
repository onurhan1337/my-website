import "@/styles/globals.css";
import "@upstash/claps/style.css";

import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import Header from "@/components/header";
import { cn } from "@/lib/utils";

const geist = {
  sans: GeistSans,
  mono: GeistMono,
};

const title = "Onurhan Demir";
const description = "Building digital products, brands, and experience.";
const image = "https://onurhan.dev/avatar.png";
const url = "https://onurhan.dev";
const locale = "tr-TR";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    url,
    images: [
      {
        url: image,
        alt: title,
      },
    ],
    siteName: title,
    locale,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    site: "@onurhan1337",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#ffffff",
  icons: {
    icon: "/avatar.png",
    apple: "/avatar.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-zinc-900 dark:bg-[#111010] dark:text-zinc-100",
        geist.sans.variable,
        geist.mono.variable
      )}
    >
      <body
        className={`max-w-2xl m-auto antialiased font-sans bg-white dark:bg-[#111010]`}
      >
        <main className="p-6 pt-3 md:pt-6">
          <Header />
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
