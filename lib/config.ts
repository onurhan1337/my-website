import type { z } from "zod";
import type { configSchema } from "./schemas";

type Config = z.infer<typeof configSchema>;

export const appConfig: Config = {
  availability: {
    enabled: true,
  },
};
