import { z } from "zod";
import { configSchema } from "./schemas";

type Config = z.infer<typeof configSchema>;

export const appConfig: Config = {
  availability: {
    enabled: true,
  },
};
