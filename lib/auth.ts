import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHub from "next-auth/providers/github";

import prisma from "@/lib/prisma";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("Github client ID and client secret are required.");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }: any) {
      if (session?.user) {
        // @ts-ignore
        session.user.id = user.id;
      }
      return session;
    },
  },
};
