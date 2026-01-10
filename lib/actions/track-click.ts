"use server";

import { trackClickServerAction } from "@/lib/click-tracking";
import type { ClickType } from "@/lib/click-tracking";

export async function trackClick(
  clickType: ClickType
): Promise<{ success: boolean; count: number }> {
  return trackClickServerAction(clickType);
}
