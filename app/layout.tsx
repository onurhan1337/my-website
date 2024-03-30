import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@/components/header";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://onurhan.dev"),
  title: {
    default: "Onurhan Demir",
    template: "%s | Onurhan Demir",
  },
  description: "Front-end Engineer",
  openGraph: {
    title: "Onurhan Demir",
    description: "Front-end Engineer",
    url: "https://onurhan.dev",
    siteName: "Onurhan Demir",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://onurhan.dev/logo.svg",
        width: 1200,
        height: 630,
        alt: "Onurhan Demir",
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
    title: "Onurhan Demir",
    card: "summary_large_image",
  },
  verification: {
    google: "K1pkJ72cY3DylswXke2MHJGxmjJ91WXwgozcCICvFrU",
    // TODO: Add yandex verification key here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-zinc-50 dark:bg-zinc-950 overflow-y-scroll`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="theme"
          enableSystem
          disableTransitionOnChange
        >
          <main className=" antialiased lg:max-w-2xl md:max-w-full mx-4 mb-40 flex flex-col md:flex-row  mt-2 sm:mt-8 lg:mx-auto">
            <section className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
              <Header />

              {children}
            </section>
          </main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
