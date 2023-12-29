"use server";

import prisma from "@/lib/prisma";
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";
import { Session } from "next-auth";

export async function saveGuestbookEntry(formData: FormData, session: Session) {
  if (!session) {
    return { success: false, error: "Not authenticated" };
  }

  let name = session?.user?.name as string;
  let email = session?.user?.email as string;
  let created_by = session?.user?.name as string;

  let message = formData.get("message")?.toString() || "";
  message = message.slice(0, 500);

  await prisma.guestbookEntry.create({
    data: {
      name,
      email,
      message,
      userId: created_by,
      createdAt: new Date(),
    },
  });

  return { success: true };
}

export async function getGuestbookEntries() {
  noStore();

  let messages = await prisma.guestbookEntry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return messages;
}

export async function deleteGuestbookEntry(id: string) {
  await prisma.guestbookEntry.delete({
    where: { id },
  });

  return { success: true };
}
