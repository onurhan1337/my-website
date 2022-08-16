import Link from "next/link";

const header = () => {
  return (
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
  );
};

export default header;
