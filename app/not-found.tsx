import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-title">Page not found.</h1>
      <p className="mt-8 text-small">
        <Link href="/" className="link">
          Home
        </Link>
      </p>
    </div>
  );
}
