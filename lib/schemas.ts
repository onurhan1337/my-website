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
    .transform((val) => {
      const dateMatch = val.match(/^(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) {
        throw new Error(
          "Invalid date format. Expected YYYY-MM-DD or ISO 8601 format"
        );
      }
      return dateMatch[1];
    })
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "Invalid date format. Expected YYYY-MM-DD",
    }),
});

/**
 * Validates blog metadata against the schema
 * @param metadata - Metadata object to validate
 * @returns Validated metadata or throws error
 */
export function validateBlogMetadata(
  metadata: unknown
): z.infer<typeof blogMetadataSchema> {
  return blogMetadataSchema.parse(metadata);
}

/**
 * Validates thought metadata against the schema
 * @param metadata - Metadata object to validate
 * @returns Validated metadata or throws error
 */
export function validateThoughtMetadata(
  metadata: unknown
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
