import NextLink from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState } from "react";
import cx from "classnames";
import IconArrowDropDown from "./icons/arrow-drop-down";

const MENU = {
  "/": "Home",
  "/works": "Works",
  "/resume": "Resume",
  "/post": "Blog",
  "/contact": "Contact",
};

const header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  const { pathname } = useRouter();
  const clearSlash = pathname.split("/")[1];
  const pathName = clearSlash ? `/${clearSlash}` : "/";

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => {
        router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, []);

  return (
    <header>
      <div className="max-w-screen-sm mx-auto flex flex-row justify-between py-6 px-6">
        <a className="text-xl">
          onurhan.dev
        </a>
        <nav
          className={cx(
              isNavOpen ? "flex" : "hidden",
              "flex-col gap-4 sm:!flex sm:flex-row"
          )}
          >
          {Object.keys(MENU).map((path) => {
              const isActive = path === pathName;
                return (
                    <span key={path}>
                       <NextLink href={path}>
                            <a className={cx( isActive ? "text-zinc-900" : "text-gray-600" )}>{MENU[path]}</a>
                        </NextLink>
                    </span>
                );
            })}
        </nav>

        {!isNavOpen && (
            <button
              type="button"
              className="flex bg-zinc-100 text-gray-700 px-3 py-1 rounded-full select-none items-center sm:hidden"
              onClick={() => {
                setIsNavOpen(true);
              }}
              >
              <span>{MENU[pathName]}</span>
              <IconArrowDropDown className="opacity-50" />
            </button>
        )}
      </div>
    </header>
  );
};

{/*
  <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col flex-end md:flex-row items-center">
        <Link href="/">
          <a className=" title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 font-bold text-xl">onurhan.dev</span>
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap space-x-8 items-center text-base">
          <Link href="/works">
            <a className="nav-item">Works</a>
          </Link>
          <Link href="/resume">
            <a className="nav-item">Resume</a>
          </Link>
          <Link href="/post">
            <a className="nav-item">Blog</a>
          </Link>
          <Link href="/contact">
            <a className="nav-item">Contact</a>
          </Link>
        </nav>
      </div>
    </header>
 */}

export default header;
