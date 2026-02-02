import Container from "@/components/shared/container";
import type { Metadata } from "next";
import { WorkClient } from "./work-client";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Onurhan Demir's professional experience and work history. Founder of Kizzle Studio, former Software Developer at Insider, Frontend Engineer at Utilify. Building e-commerce solutions and web applications.",
  keywords: [
    "Onurhan Demir Work",
    "Onurhan Demir Experience",
    "Onurhan Demir Career",
    "Kizzle Studio",
    "Software Developer Turkey",
    "Full Stack Developer Experience",
  ],
  openGraph: {
    title: "Work | Onurhan Demir",
    description:
      "Onurhan Demir's professional experience and work history. Founder of Kizzle Studio, specializing in e-commerce and full-stack development.",
    url: "https://onurhan.dev/work",
  },
  alternates: {
    canonical: "https://onurhan.dev/work",
  },
};

export default function Work() {
  return (
    <Container size="large">
      <WorkClient />
    </Container>
  );
}
