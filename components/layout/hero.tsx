import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Text } from "../ui/text";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-full overflow-hidden"></div>
        <div className="text-center py-12 space-y-2">
          <Text as="p" styleVariant="lead" className="text-2xl">
            Building digital
          </Text>
          <Text as="p" styleVariant="lead" className="text-2xl">
            products, interfaces, and
          </Text>
          <Text as="p" styleVariant="lead" className="text-2xl">
            experience.
          </Text>
        </div>
        <div className="flex space-x-4">
          <Button variant={"ghost"} asChild>
            <Link href="mailto:onurhandtr@gmail.com">Email</Link>
          </Button>
          <Button variant={"ghost"} asChild>
            <Link
              href="https://x.com/onurhan1337"
              target="_blank"
              rel="noopener noreferrer"
            >
              X(Twitter)
            </Link>
          </Button>
          <Button variant={"ghost"} asChild>
            <Link
              href="https://github.com/onurhan1337"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
