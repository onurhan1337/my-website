"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <Container size="large">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            We encountered an unexpected error. Don&apos;t worry, we&apos;re on
            it!
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="mb-6 p-4 bg-destructive/10 rounded-lg text-left">
              <p className="text-sm font-semibold mb-2 text-destructive">
                Error Details (Development Only):
              </p>
              <pre className="text-xs overflow-auto text-muted-foreground">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} variant="default" size="lg">
              Try again
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              size="lg"
            >
              Go home
            </Button>
          </div>

          {error.digest && (
            <p className="mt-6 text-sm text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
