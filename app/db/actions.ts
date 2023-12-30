"use server";

import prisma from "@/lib/prisma";
import { unstable_noStore as noStore, revalidateTag } from "next/cache";
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

export async function createComment(
  postSlug: string,
  formData: FormData,
  session: Session
) {
  let message = formData.get("comment")?.toString() || "";
  message.slice(0, 500);

  if (!session) {
    return { success: false, error: "Not authenticated" };
  }

  let id = session?.user?.id as string;
  let name = session?.user?.name as string;
  let email = session?.user?.email as string;
  let image = session?.user.image as string;

  try {
    const comment = await prisma.comment.create({
      data: {
        userId: id,
        postSlug,
        name,
        email,
        avatarUrl: image,
        message,
        createdAt: new Date(),
      },
    });

    revalidateTag(`comments`);
    return comment;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getComments(postSlug: string) {
  noStore();

  let comments = await prisma.comment.findMany({
    where: { postSlug },
    orderBy: { createdAt: "desc" },
  });

  return comments;
}

export async function deleteComment(id: string) {
  await prisma.comment.delete({
    where: { id },
  });

  revalidateTag("comments");
  return { success: true };
}
