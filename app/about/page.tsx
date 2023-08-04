import { Metadata } from "next";

import Social from "@/components/social";

export const metadata: Metadata = {
  title: "About",
  description: "Front-end Engineer at Utilify.",
};

const About = () => {
  return (
    <section>
      <h1 className="text-2xl font-serif">About me</h1>

      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hey, I&apos;m Onurhan.
      </p>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>
          I&apos;m currently the <b>Front-end Engineer at Utilify</b>,
          developing interfaces. I focus on crafting and developing the
          interfaces for users and brands.
        </p>
        <hr />
        <p>
          I&apos;m passionate about many creative pursuits, including design and
          of course coding. This combination of interests eventually led me to
          my current role, frontend development.
        </p>
        <p>
          I love software development, especially getting feedback from users
          motivates me a lot. It&apos;s especially exciting to improve users
          experience and let them focus solely on production. Just build.
        </p>
        <p className="mb-8">
          Outside of these, I develop minimal digital products. I develop
          packages that will both solve the problems I have on the web and
          facilitate our development process.
        </p>
        <Social />
      </div>
    </section>
  );
};

export default About;