import Container from "@/components/shared/container";
import Social from "@/components/social";

export default function About() {
  const paragraphs = [
    `As a Front-end Engineer working independently, I specialize in
    building user interfaces for various brands. My passion lies in the
    intersection of design and coding, which has shaped my journey into
    front-end development.`,
    `Driven by a love for software development, I thrive on receiving user
    feedback and improving the overall user experience. It's
    especially exciting to streamline production and focus solely on
    building.`,
    `Outside of work, I enjoy creating minimalist digital products that
    solve web-related challenges and simplify our development workflow.`,
  ];

  return (
    <Container
      size="large"
      className="prose prose-zinc dark:prose-invert 
      text-zinc-800 dark:text-zinc-200 container animate-enter"
    >
      <p className="my-5 text-zinc-800 dark:text-zinc-200">
        Hi, I&apos;m Onurhan.
      </p>
      {paragraphs.map((paragraph, index) => (
        <div
          key={paragraph}
          style={
            { "--stagger": index } as React.CSSProperties & {
              [key: string]: number;
            }
          }
        >
          <p className={index === paragraphs.length - 1 ? "mb-8" : ""}>
            {paragraph}
          </p>
          {index === 0 && <hr />}
        </div>
      ))}
      <Social />
    </Container>
  );
}
