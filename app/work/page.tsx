import type { Metadata } from "next";
import Container from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Work",
  description: "A summary of my work and contributions.",
};

export default function Work() {
  return (
    <Container size="large">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert text-justify">
        <p>
          On a mission to create user interfaces that engage users and elevate
          brands. Here&apos;s a summary of my work so far.
        </p>
        <hr className="my-6 border-neutral-200 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">Utilify</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          frontend engineer, 2023 — 2024
        </p>
        <p>
          I joined <a href="https://utilify.xyz">Utilify</a> build intuitive
          interfaces and pages for users and brands.
        </p>
        <ul>
          <li>
            Successfully converted wireframe designs into active working user
            interface components.
          </li>
          <li>Developed rule-based form builder for brands.</li>
          <li>
            Developed and implemented user and enterprise dashboard interface,
            including all related pages, for user interaction and data
            visualization.
          </li>
          <li>
            Stayed abreast of emerging trends and best practices in front-end
            development, continually honing skills and exploring innovative
            solutions to technical challenges.
          </li>
          <li>
            Developed the{" "}
            <a href="https://app.utilify.xyz/ucl">Campaign page</a> for the
            souvenir NFT distributed for the UCL final in partnership with
            Turkish Airlines.
          </li>
        </ul>
      </div>
    </Container>
  );
}
