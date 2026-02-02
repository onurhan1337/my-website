"use client";

import { KizzleCTAButton } from "@/components/kizzle-cta-button";
import { trackClick } from "@/lib/actions/track-click";

export function KizzleCTA() {
  return (
    <section className="mb-8 p-6 bg-[#0a0a0a] rounded-lg border border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-medium text-base tracking-tight mb-1 text-white">
            Need a shopify or ikas expert?
          </h3>
          <p className="text-sm text-neutral-300">
            Custom e-commerce development at kizzle studio
          </p>
        </div>
        <div
          onClick={() => {
            trackClick("MAIN_PAGE:KIZZLE").catch(console.error);
          }}
          className="shrink-0"
        >
          <KizzleCTAButton text="Get in Touch" />
        </div>
      </div>
    </section>
  );
}
