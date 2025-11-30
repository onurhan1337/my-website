"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import type { AvailabilityDialogProps } from "@/types";

export function AvailabilityDialog({
  open,
  onOpenChange,
}: AvailabilityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium tracking-tight mb-4">
            Available for Work
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-[15px] leading-relaxed opacity-75">
            I&apos;m available immediately for full-time opportunities. Open to
            remote, hybrid, or on-site work.
          </p>

          <div>
            <p className="text-[15px] leading-relaxed opacity-75 mb-1">
              Looking for roles as:
            </p>
            <div className="text-[15px] leading-relaxed opacity-75 space-y-0.5">
              <p>Full Stack Developer</p>
              <p>Product Engineer</p>
              <p>React/Next.js Specialist</p>
            </div>
          </div>

          <p className="text-[15px] leading-relaxed opacity-75">
            Based in Türkiye, open to remote work worldwide. Flexible with
            timezone requirements.
          </p>

          <div className="pt-1">
            <p className="text-[15px] leading-relaxed opacity-75 mb-2">
              Let&apos;s connect:
            </p>
            <div className="flex flex-col gap-1.5 text-[15px]">
              <Link
                href="mailto:onurhandtr@gmail.com"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                onurhandtr@gmail.com
              </Link>
              <Link
                href="https://github.com/onurhan1337"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                GitHub
              </Link>
              <Link
                href="https://x.com/onurhan1337"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                X
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
