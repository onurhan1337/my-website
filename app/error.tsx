"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/container";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <Container size="large">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-24"
        >
          <div className="mb-6 text-6xl opacity-10">—</div>
          <p className="text-sm tracking-tight opacity-50 mb-2">
            Something went wrong
          </p>
          <p className="text-xs tracking-wider opacity-30">
            Simplicity is the ultimate sophistication
          </p>

          {process.env.NODE_ENV === "development" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8 p-4 border border-foreground/10 rounded-lg text-left bg-foreground/[0.02] max-w-md w-full"
            >
              <p className="text-xs font-medium mb-2 opacity-60 tracking-tight uppercase">
                Error Details (Development Only):
              </p>
              <pre className="text-xs overflow-auto opacity-50 font-mono">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </motion.div>
          )}

          <Link
            href="/"
            className="mt-12 text-xs opacity-40 hover:opacity-60 transition-opacity tracking-tight"
          >
            ← Back
          </Link>
        </motion.div>
      </div>
    </Container>
  );
}
