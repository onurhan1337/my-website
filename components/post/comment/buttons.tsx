"use client";

import { signIn } from "next-auth/react";

import { deleteComment } from "@/app/db/actions";
import IconGithub from "@/components/icons/github";

interface DeleteCommentProps {
  id: string;
}

export function SignIn() {
  return (
    <button
      className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-8"
      onClick={() => signIn("github")}
    >
      <IconGithub className="w-4 h-4 mr-2" />
      <div className="gap-2">
        Sign in with <span className="font-bold">GitHub</span> to comment
      </div>
    </button>
  );
}

export const DeleteComment: React.FC<DeleteCommentProps> = ({ id }) => {
  return (
    <button
      onClick={async () => {
        await deleteComment(id);
      }}
      className="text-neutral-800 dark:text-red-400 mr-1"
    >
      x
    </button>
  );
};
