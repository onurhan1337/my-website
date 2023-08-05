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
        <p className="text-2xl ">
          <Balancer>Building digital</Balancer>
        </p>
        <p className="text-2xl">
          <Balancer> products, interfaces, and</Balancer>
        </p>
        <p className="text-2xl">
          <Balancer> experience.</Balancer>
        </p>
      </div>
      <div>
        <Button variant={"ghost"} asChild>
          <Link href="mailto:onurhandtr@gmail.com">Email</Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link
            href="https://twitter.com/onurhan1337"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </Link>
        </Button>
        <Button variant={"ghost"}>
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
