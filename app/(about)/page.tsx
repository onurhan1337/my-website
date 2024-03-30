import Container from "@/components/shared/container";
import Social from "@/components/social";

export default function About() {
  return (
    <Container>
      <p className="my-5 text-zinc-800 dark:text-zinc-200">
        Hi, I&apos;m Onurhan.
      </p>
      <div className="prose prose-zinc dark:prose-invert text-zinc-800 dark:text-zinc-200 text-justify">
        <p>
          As a Front-end Engineer working independently, I specialize in
          building user interfaces for various brands. My passion lies in the
          intersection of design and coding, which has shaped my journey into
          front-end development.
        </p>
        <hr />
        <p>
          Driven by a love for software development, I thrive on receiving user
          feedback and improving the overall user experience. It&apos;s
          especially exciting to streamline production and focus solely on
          building.
        </p>
        <p className="mb-8">
          Outside of work, I enjoy creating minimalist digital products that
          solve web-related challenges and simplify our development workflow.
        </p>
      </div>

      <Social />
    </Container>
  );
}
