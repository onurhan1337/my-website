import Image from "next/image";
import { getServerSession } from "next-auth";

import { getComments } from "@/app/db/actions";
import { authOptions } from "@/lib/auth";
import { DeleteComment } from "./buttons";

export const CommentList = async ({ postSlug }: { postSlug: string }) => {
  const session = await getServerSession(authOptions);
  const comments = await getComments(postSlug);

  return comments.map((comment) => {
    const isAdmin: boolean =
      session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const isAuthor: boolean = session?.user?.email === comment.email;

    return (
      <div
        key={comment.id}
        className="flex flex-row items-center space-x-2 mb-4"
      >
        <div className="flex flex-row items-center w-full text-sm break-words space-y-1 space-x-3">
          <span className="flex-shrink-0">
            <Image
              src={comment.avatarUrl}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full "
            />
          </span>
          <div>
            <span className="text-neutral-800 dark:text-neutral-400 mr-1">
              {comment.name}:
            </span>
            <span className="break-all text-neutral-600 dark:text-neutral-400 mr-1">
              {comment.message}
            </span>
          </div>
          {(isAdmin || isAuthor) && <DeleteComment id={comment.id} />}
        </div>
      </div>
    );
  });
};
