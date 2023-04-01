import Image from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";
import SuperpeerLogo from "../public/photos/superpeer_logo.svg";
import Head from "next/head";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact | Onurhan Demir</title>
        <meta
          name="description"
          content="
      all my social media links and contact information here"
        />
        <meta property="og:image" content="/photos/avatar.png" />
      </Head>

      <div className="container mx-auto items-center flex flex-col">
        <Image
          src="/photos/avatar.png"
          alt="avatar"
          width={128}
          height={128}
          className="w-32 h-32 object-contain object-center rounded-full"
        />
        <h2 className="mt-3 text-3xl sm:text-6xl leading-tight dark:text-white font-semibold text-center">
          <span className="sketch-highlight">Hello!</span> I&apos;ve
          <br /> waiting for you.
        </h2>
        <p className="my-3 text-center text-black dark:text-zinc-500 pt-2">
          Contact to me in superpeer or{" "}
          <a
            href="mailto:onurhandtr@gmail.com"
            className="underline underline-offset-2 font-semibold dark:text-zinc-300"
          >
            Send me an email
          </a>
        </p>
        <NextLink href="https://superpeer.com/onurhan" legacyBehavior>
          <motion.button
            whileHover={{ boxShadow: "0px 4px 8px yellow" }}
            className={
              "button flex flex-none items-center justify-around gap-x-1.5 bg-black dark:bg-transparent dark:text-white dark:border-2 dark:border-stone-300/25 text-white"
            }
          >
            superpeer
            <SuperpeerLogo
              className="w-8 h-8"
              src="photos/superpeer_logo.svg"
              alt="superpeer logo"
            />
          </motion.button>
        </NextLink>
      </div>
    </>
  );
};

export default ContactPage;
