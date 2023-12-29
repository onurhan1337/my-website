"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { SignIn, SignOut } from "./buttons";
import { saveGuestbookEntry } from "@/app/db/actions";

export const GuestbookForm = () => {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      {session ? (
        <>
          <form
            className="relative max-w-[500px]"
            ref={formRef}
            action={async (formData) => {
              await saveGuestbookEntry(formData, session);
              formRef.current?.reset();
            }}
          >
            <input
              aria-label="Your message"
              placeholder="Your message..."
              name="message"
              type="text"
              autoComplete="off"
              required
              max={500}
              className="pl-4 pr-32 py-2  block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-neutral-200 dark:focus:ring-neutral-900 ring-zinc-300 ring-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
            <SubmitButton />
          </form>
          <SignOut />
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
        "flex items-center justify-center absolute right-1 top-1 px-2 py-1 font-medium h-8 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded w-16",
        pending && "opacity-50 cursor-not-allowed"
      )}
    >
      {pending ? "Signing" : "Sign"}
    </button>
  );
}
