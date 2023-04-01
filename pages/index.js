import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Icons from "../components/icons";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Onurhan | Front-end Developer</title>
        <meta
          name="description"
          content="Building digital
          products, brands, and
          experience."
        />
        <meta property="og:image" content="/photos/avatar.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta locale="tr-TR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto items-center flex flex-col">
        <div className="site-container flex flex-col">
          <Image
            src="/photos/avatar.png"
            alt="avatar"
            width={128}
            height={128}
            className="w-32 h-32 object-contain object-center rounded-full"
          />

          <h3 className="title text-black dark:text-zinc-300">
            Hi, I&apos;m Onurhan
          </h3>

          <h2 className="text-black dark:text-white text-2xl sm:text-6xl leading-tight font-semibold text-center">
            <span className="sketch-highlight">Building</span> digital <br />
            products, brands, and <br /> experience.
          </h2>
          <p className="text-center text-zinc-800 dark:text-zinc-400 pt-4">
            a <span className="font-semibold">Front-end Developer</span> in
            Turkey.
            <br /> I&apos;m in the know UI/UX Design, Web Development,
            <br /> and crafting interfaces.
          </p>
        </div>
        <Icons />
        <Link href="/contact" legacyBehavior>
          <motion.button
            whileHover={{
              boxShadow: "0px 4px 8px #4ade80",
            }}
            className="bg-gray-950 hover:bg-black text-white dark:bg-white font-bold button"
          >
            CONNECT WITH ME
          </motion.button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
