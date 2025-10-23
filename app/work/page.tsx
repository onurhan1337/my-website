import Container from "@/components/shared/container";

export default function Work() {
  return (
    <Container size="large">
      <main className="prose prose-neutral">
        <header>
          <p className="text-[15px] leading-relaxed opacity-80">
            On a mission to create impactful applications that engage users and
            drive value for businesses. Here&apos;s a summary of my journey so
            far.
          </p>
        </header>

        <section>
          <article className="mb-12">
            <header className="mb-4">
              <h2 className="font-medium text-xl mb-2 tracking-tight">
                Insider
              </h2>
              <time className="opacity-60 text-[15px] tracking-tight">
                Software Developer, 2024 — 2025
              </time>
            </header>
            <p className="text-[15px] leading-relaxed opacity-80">
              At Insider, I am part of the Partner Solution Development team,
              where I contribute to the development of B2B SaaS solutions
              tailored to our clients&apos; needs. My role involves
              collaborating with cross-functional teams to deliver scalable and
              efficient software solutions that help businesses grow and
              optimize their workflows.
            </p>
            <ul className="text-[15px] leading-relaxed opacity-80">
              <li>
                Developing and customizing solutions for enterprise clients to
                enhance their business operations.
              </li>
              <li>
                Collaborating closely with product managers and designers to
                deliver user-centric features for B2B applications.
              </li>
              <li>
                Implementing efficient and maintainable codebases using modern
                software development practices.
              </li>
              <li>
                Actively improving existing systems by identifying bottlenecks
                and implementing optimizations.
              </li>
            </ul>
          </article>

          <article className="mb-12">
            <header className="mb-4">
              <h2 className="font-medium text-xl mb-2 tracking-tight">
                Utilify
              </h2>
              <time className="opacity-60 text-[15px] tracking-tight">
                Frontend Engineer, 2023 — 2024
              </time>
            </header>
            <p className="text-[15px] leading-relaxed opacity-80">
              I joined{" "}
              <a href="https://utilify.xyz" rel="noopener noreferrer">
                Utilify
              </a>{" "}
              to build intuitive interfaces and pages for users and brands.
            </p>
            <ul className="text-[15px] leading-relaxed opacity-80">
              <li>
                Successfully converted wireframe designs into active working
                user interface components.
              </li>
              <li>Developed rule-based form builder for brands.</li>
              <li>
                Developed and implemented user and enterprise dashboard
                interface, including all related pages, for user interaction and
                data visualization.
              </li>
              <li>
                Stayed abreast of emerging trends and best practices in
                front-end development, continually honing skills and exploring
                innovative solutions to technical challenges.
              </li>
              <li>
                Developed the{" "}
                <a href="https://app.utilify.xyz/ucl" rel="noopener noreferrer">
                  Campaign page
                </a>{" "}
                for the souvenir NFT distributed for the UCL final in
                partnership with Turkish Airlines.
              </li>
            </ul>
          </article>
        </section>
      </main>
    </Container>
  );
}
