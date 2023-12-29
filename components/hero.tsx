"use client";
import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <>
      <Image
        className="rounded-full"
        src="/avatar.png"
        alt="avatar"
        width={150}
        height={150}
        priority
      />
      <div className="text-center py-12">
        <p className="text-2xl text-zinc-700 dark:text-zinc-300">
          <Balancer>Building digital</Balancer>
        </p>
        <p className="text-2xl text-zinc-700 dark:text-zinc-300">
          <Balancer> products, interfaces, and</Balancer>
        </p>
        <p className="text-2xl text-zinc-700 dark:text-zinc-300">
          <Balancer> experience.</Balancer>
        </p>
      </div>
      <div>
        <Button
          variant={"ghost"}
          className="dark:text-zinc-200 text-zinc-700 dark:hover:text-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 hover:bg-zinc-100"
          asChild
        >
          <Link href="mailto:onurhandtr@gmail.com">Email</Link>
        </Button>
        <Button
          variant={"ghost"}
          className="dark:text-zinc-200 text-zinc-700 dark:hover:text-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 hover:bg-zinc-100"
          asChild
        >
          <Link
            href="https://x.com/onurhan1337"
            target="_blank"
            rel="noopener noreferrer"
          >
            X(Twitter)
          </Link>
        </Button>
        <Button
          variant={"ghost"}
          className="dark:text-zinc-200 text-zinc-700 dark:hover:text-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 hover:bg-zinc-100"
          asChild
        >
          <Link
            href="https://github.com/onurhan1337"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Hero;
