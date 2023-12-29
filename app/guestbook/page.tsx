import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { GuestbookForm } from "@/components/guestbook/form";
import { authOptions } from "@/lib/auth";
import { getGuestbookEntries } from "../db/actions";
import { DeleteGuestbook } from "@/components/guestbook/buttons";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a message in my guestbook.",
};

const Guestbook = async () => {
  const session = await getServerSession(authOptions);
  const entries = await getGuestbookEntries();

  const isAdmin: boolean =
    session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  return (
    <section>
      <h1 className={"text-2xl font-serif text-center dark:text-zinc-200"}>
        Leave a message in my guestbook
      </h1>

      <div className="py-4 grid place-items-center">
        <GuestbookForm />
      </div>
      <div className="flex flex-row items-start justify-start sm:justify-center py-4 space-x-3">
        <div>
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-row items-center space-x-2 mb-4"
            >
              <div className="w-full text-sm break-words space-y-1">
                <span className="text-neutral-800 dark:text-neutral-400 mr-1">
                  {entry.name}:
                </span>
                <span className="break-all text-neutral-600 dark:text-neutral-400 mr-1">
                  {entry.message}
                </span>
              </div>
              {isAdmin && (
                <div>
                  <DeleteGuestbook id={entry.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
