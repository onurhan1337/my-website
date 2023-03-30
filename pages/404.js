import NextLink from "next/link"
import Button from "../components/button"
import NotFound from "../components/icons/404"

function Error() {
    return (
        <div className="flex flex-col m-auto justify-center items-center text-center">
            <div className="my-2 mx-4">
                <h1 className="text-5xl font-bold">404</h1>
                <p className="text-black dark:text-stone-200">
                    The page you were looking for <span className="font-bold underline">could not</span> be found.
                </p>
                <p className="text-black dark:text-stone-200">To return to the Home Page,</p>
                <NextLink href="/">
                    <Button className={" bg-[#100F0F] hover:ring-black dark:bg-[#458766] dark:text-black mt-2"}>
                        Go Home
                    </Button>
                </NextLink>
            </div>
            <NotFound size={200} className="w-72 h-72 object-contain object-center rounded-full" />
        </div>
    )
}

export default Error
