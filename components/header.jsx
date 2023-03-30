import NextLink from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import cx from "classnames"
import IconArrowDropDown from "./icons/arrow-drop-down"
import IconXCircle from "./icons/x-circle"
import IconMoon from "./icons/moon"
import IconSun from "./icons/sun"

const MENU = {
    "/": "Home",
    "/works": "Works",
    "/resume": "Resume",
    "/post": "Blog",
    "/contact": "Contact"
}

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)

    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    const router = useRouter()

    const { pathname } = useRouter()
    const clearSlash = pathname.split("/")[1]
    const pathName = clearSlash ? `/${clearSlash}` : "/"

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setIsNavOpen(false)
            setMounted(true)
        }

        router.events.on("routeChangeStart", handleRouteChangeStart)
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <header>
            <div className="max-w-screen-sm mx-auto flex flex-col-reverse sm:flex-row justify-between py-6 px-6">
                <nav className={cx(isNavOpen ? "flex" : "hidden", "flex-col ml-3 gap-3 my-4 sm:!flex sm:flex-row")}>
                    {Object.keys(MENU).map(path => {
                        const isActive = path === pathName
                        return (
                            <span key={path}>
                                <NextLink href={path}>
                                    <a
                                        className={cx(
                                            isActive
                                                ? "text-zinc-900 dark:text-zinc-700 bg-green-200 dark:bg-purple-300 px-2 py-1 rounded-md"
                                                : "text-gray-600 dark:text-zinc-400 hover:underline underline-offset-4 px-2 py-1"
                                        )}
                                    >
                                        {MENU[path]}
                                    </a>
                                </NextLink>
                            </span>
                        )
                    })}
                </nav>

                {/* Nav mobile open and close button condition */}
                <div className="flex flex-row justify-between">
                    {!isNavOpen ? (
                        <button
                            type="button"
                            className="flex select-none items-center sm:hidden text-gray-700 dark:text-zinc-400"
                            onClick={() => {
                                setIsNavOpen(true)
                            }}
                        >
                            <span>{MENU[pathName]}</span>
                            <IconArrowDropDown className="opacity-50" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="flex select-none sm:hidden text-gray-700 dark:text-zinc-400"
                            onClick={() => {
                                setIsNavOpen(false)
                            }}
                        >
                            <IconXCircle className="opacity-50" />
                        </button>
                    )}

                    {/* Theme switch button */}
                    <button
                        className="flex my-0 sm:my-4"
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    >
                        {resolvedTheme === "dark" ? <IconSun /> : <IconMoon />}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
