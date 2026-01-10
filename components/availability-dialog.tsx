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
import IconUpwork from "@/components/shared/icons/upwork";
import type { AvailabilityDialogProps } from "@/types";
import { trackClick } from "@/lib/actions/track-click";
import type { ClickType } from "@/lib/click-tracking";

function handleTrackClick(clickType: ClickType) {
  trackClick(clickType).catch((error) => {
    console.error("Failed to track click:", error);
  });
}

export function AvailabilityDialog({
  open,
  onOpenChange,
}: AvailabilityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-xl font-medium tracking-tight mb-2">
            Available for Work
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-[15px] leading-relaxed opacity-80">
              I&apos;m available immediately for full-time opportunities. Open
              to remote, hybrid, or on-site work.
            </p>

            <div>
              <p className="text-[15px] font-medium leading-relaxed opacity-90 mb-2">
                Looking for roles as:
              </p>
              <div className="text-[15px] leading-relaxed opacity-75 space-y-1 pl-1">
                <p>• Senior Front-end Engineer</p>
                <p>• Product Engineer</p>
                <p>• React/Next.js Specialist</p>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed opacity-80">
              Based in Türkiye, open to remote work worldwide. Flexible with
              timezone requirements.
            </p>
          </div>

          <hr className="border-foreground/10" />

          <div className="space-y-4">
            <p className="text-[15px] leading-[22px] opacity-80 font-medium tracking-[-0.6px] text-[#00bd8e]">
              Besides full-time roles, I also take on freelance projects and
              outsourced software development.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="default"
                className="w-full justify-center sm:justify-start gap-2 h-10 bg-[#f5f5f5] text-[#262626] tracking-[-0.1px] border-0 hover:opacity-90 outline-1 outline-offset-2 outline-secondary hover:bg-secondary hover:outline-offset-0"
              >
                <Link
                  href="https://www.upwork.com/freelancers/~018ec24713c9a36406?mp_source=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  onClick={() => handleTrackClick("AVAILABILITY_DIALOG:UPWORK")}
                >
                  <IconUpwork size={18} />
                  <span>Upwork</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="default"
                className="w-full justify-center sm:justify-start gap-2 h-10 bg-[#f5f5f5] text-[#262626] tracking-[-0.1px] border-0 hover:opacity-90 outline-1 outline-offset-2 outline-secondary hover:bg-secondary hover:outline-offset-0"
              >
                <Link
                  href="mailto:onurhandtr@gmail.com"
                  className="flex items-center gap-2"
                  onClick={() => handleTrackClick("AVAILABILITY_DIALOG:EMAIL")}
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
