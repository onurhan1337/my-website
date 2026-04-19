import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().default("https://onurhan.dev"),
});

type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

function getEnv(): Env {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  });

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Invalid environment variables:",
        parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }))
      );
    }
    cachedEnv = {
      NEXT_PUBLIC_APP_URL: "https://onurhan.dev",
    };
    return cachedEnv;
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}

export const env = getEnv();
