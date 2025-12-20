import { z } from "zod";

/**
 * Schema for blog post metadata validation
 */
export const blogMetadataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  publishedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Expected YYYY-MM-DD"),
  summary: z.string().min(1, "Summary is required"),
  keywords: z
    .union([
      z.array(z.string()),
      z.string().transform((val) => {
        return val
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean);
      }),
    ])
    .optional()
    .default([]),
  image: z.string().optional(),
});

/**
 * Schema for thought metadata validation
 */
export const thoughtMetadataSchema = z.object({
  type: z.enum(["code", "idea", "quote", "book"], {
    message: "Type must be one of: code, idea, quote, book",
  }),
  createdAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, {
      message:
        "createdAt must be in the exact format YYYY-MM-DDTHH:MM (e.g. 2025-12-21T00:29). Seconds are not allowed.",
    })
    .refine(
      (val) => {
        const [, hour, minute] = val.match(/T(\d{2}):(\d{2})$/)!;
        const h = parseInt(hour, 10);
        const m = parseInt(minute, 10);
        return h >= 0 && h <= 23 && m >= 0 && m <= 59;
      },
      {
        message: "Hour must be 00-23 and minute must be 00-59.",
      },
    ),
});

/**
 * Validates blog metadata against the schema
 * @param metadata - Metadata object to validate
 * @returns Validated metadata or throws error
 */
export function validateBlogMetadata(
  metadata: unknown,
): z.infer<typeof blogMetadataSchema> {
  return blogMetadataSchema.parse(metadata);
}

/**
 * Validates thought metadata against the schema
 * @param metadata - Metadata object to validate
 * @returns Validated metadata or throws error
 */
export function validateThoughtMetadata(
  metadata: unknown,
): z.infer<typeof thoughtMetadataSchema> {
  return thoughtMetadataSchema.parse(metadata);
}

/**
 * Schema for app configuration validation
 */
export const configSchema = z.object({
  availability: z.object({
    enabled: z.boolean().default(true),
  }),
});
