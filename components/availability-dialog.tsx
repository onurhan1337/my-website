"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";
import type { AvailabilityDialogProps } from "@/types";

export function AvailabilityDialog({
  open,
  onOpenChange,
}: AvailabilityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-xl font-medium tracking-tight mb-2">
            Who am I
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-[15px] leading-relaxed opacity-80">
              Hi, I&apos;m Onurhan Demir — a <span className="font-medium">Developer Advocate &amp; Frontend Developer</span> at <span className="font-medium">ikas</span>, helping grow the developer ecosystem and build clean, useful products for the platform.
            </p>

            <div>
              <p className="text-[15px] font-medium leading-relaxed opacity-90 mb-2">
                What I do:
              </p>
              <div className="text-[15px] leading-relaxed opacity-75 space-y-1 pl-1">
                <p>• Developer relations &amp; ecosystem growth</p>
                <p>• Frontend &amp; Studio development</p>
                <p>• Technical content, guides &amp; examples</p>
                <p>• UX-focused digital experiences</p>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed opacity-80">
              I love talking to developers, agencies, and merchants — sharing ideas, helping people build on ikas, and turning their feedback into better products. My inbox is always open.
            </p>
          </div>

          <hr className="border-foreground/10" />

          <div className="space-y-4">
            <p className="text-[15px] leading-[22px] opacity-90 font-medium tracking-[-0.6px]">
              Building on ikas, have an idea, or just want to chat? Reach out — I&apos;d love to hear from you.
            </p>

            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="w-full justify-center gap-2 h-[52px] px-5"
                variant={'fancy'}
              >
                <Link
                  href="mailto:onurhandtr@gmail.com"
                  className="flex items-center gap-2"
                >
                  <Mail size={18} />
                  <span>Email</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}