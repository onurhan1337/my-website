import Link from "next/link";
import dynamic from 'next/dynamic';
import Hero from "../components/hero";
import Icons from "../components/icons";

const HomePage = () => {
  const title = (
    <h2 className="text-zinc-900 dark:text-white sm:text-6xl leading-tight font-semibold text-center">
      <span className="sketch-highlight">Building</span> digital <br />
      products, brands, and <br /> experience.
    </h2>
  );

  const message = (
    <p className="text-center text-zinc-800 dark:text-zinc-400 pt-4">
      a <span className="font-semibold">Front-end Developer</span> in Turkey.
      <br /> I'm in the know UI/UX Design, Web Development,
      <br /> and crafting interfaces.
    </p>
  );

  return (
    <div className="container mx-auto items-center flex flex-col">
      <Hero avatarLabel="Hi, I'm Onurhan 🤘" title={title} message={message} />
      <Icons />
      <Link href="/contact">
        <button className="w-48 h-16 mb-6 text-sm bg-[#0D0E10] dark:bg-green-400 dark:text-zinc-900 text-white hover:bg-black transition-all rounded-full">
          CONNECT WITH ME
        </button>
      </Link>
    </div>
  );
};
{/*Hydration failed because the initial UI does not match what was rendered on the server
  error solved with next/dynamic
*/}
export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false
});
