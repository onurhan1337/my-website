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
import { KizzleCTAButton, KIZZLE_URL } from "@/components/kizzle-cta-button";
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
            Building Kizzle Studio
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-[15px] leading-relaxed opacity-80">
              I&apos;m currently focused on building{" "}
              <Link
                href={KIZZLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-foreground/30 underline-offset-2 hover:opacity-100 transition-opacity"
              >
                Kizzle Studio
              </Link>
              , an e-commerce development studio specializing in Shopify and
              Ikas platforms.
            </p>

            <div>
              <p className="text-[15px] font-medium leading-relaxed opacity-90 mb-2">
                What we do:
              </p>
              <div className="text-[15px] leading-relaxed opacity-75 space-y-1 pl-1">
                <p>• Custom Shopify & Ikas development</p>
                <p>• Corporate invoicing workflows</p>
                <p>• AI-powered analytics solutions</p>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed opacity-80">
              We build the technical infrastructure that powers exceptional
              commerce experiences for ambitious brands.
            </p>
          </div>

          <hr className="border-foreground/10" />

          <div className="space-y-4">
            <p className="text-[15px] leading-[22px] opacity-90 font-medium tracking-[-0.6px]">
              Looking to build or scale your e-commerce business? Let&apos;s
              talk.
            </p>

            <div className="flex flex-col gap-3">
              <div onClick={() => handleTrackClick("AVAILABILITY_DIALOG:KIZZLE")}>
                <KizzleCTAButton
                  text="Kizzle Studio"
                  href="https://kizzle.studio"
                  className="w-full justify-center"
                />
              </div>
              <Button
                asChild
                variant="default"
                className="w-full justify-center gap-2 h-[52px] px-5 bg-[#f5f5f5] text-[#262626] tracking-[-0.1px] border border-neutral-200 hover:opacity-90 hover:bg-[#ebebeb]"
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
