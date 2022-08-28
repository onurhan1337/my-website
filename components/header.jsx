import NextLink from "next/link";
import {useEffect, useState } from "react";
import { useRouter } from "next/router";
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
        <NextLink href="/">
          <a className="text-gray-900 text-xl">
            <span className="ml-3 font-bold text-xl">onurhan.dev</span>
          </a>
        </NextLink>
        <nav
          className={cx(
              isNavOpen ? "flex" : "hidden",
              "flex-col gap-x-6 sm:!flex sm:flex-row"
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

export default header;
