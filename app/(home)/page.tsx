import Hero from "@/components/hero";
import { metadata } from "@/lib/meta";

export async function generateMetadata({ params }: any) {
  return metadata;
}

export default function Home() {
  return (
    <section className="flex flex-col items-center py-24 bg-white dark:bg-[#111010]">
      <Hero />
    </section>
  );
}
