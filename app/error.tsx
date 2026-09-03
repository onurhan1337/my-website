"use client";

import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div>
      <h1 className="text-title">Something went wrong.</h1>
      {process.env.NODE_ENV === "development" && (
        <pre className="mt-8 overflow-auto rounded-md bg-well p-4 text-caption text-ink-2">
          {error.message}
          {error.digest && `\nDigest: ${error.digest}`}
        </pre>
      )}
      <p className="mt-8 text-small">
        <Link href="/" className="link">
          Home
        </Link>
      </p>
    </div>
  );
}
