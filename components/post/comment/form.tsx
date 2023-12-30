"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { SignIn } from "./buttons";
import { SignOut } from "@/components/guestbook/buttons";
import { createComment } from "@/app/db/actions";

export const CommentForm = ({ postSlug }: { postSlug: string }) => {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      {session ? (
        <>
          <form
            className="space-y-2"
            ref={formRef}
            action={async (formData) => {
              await createComment(postSlug, formData, session);
              formRef.current?.reset();
            }}
          >
            <textarea
              aria-label="Your message"
              placeholder="Your message..."
              name="comment"
              maxLength={500}
              required
              className="flex w-full max-h-40 p-3 rounded resize-y bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-400 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-300 focus:outline-none"
              rows={2}
            />
            <div className="flex items-start justify-between">
              <SignOut />
              <SubmitButton />
            </div>
          </form>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "text-sm flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-1.5 py-2",
        pending && "opacity-50 cursor-not-allowed"
      )}
    >
      {pending ? "Commenting..." : "Comment"}
    </button>
  );
}
