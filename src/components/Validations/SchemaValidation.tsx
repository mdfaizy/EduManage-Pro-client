import { z } from "zod";

export const sectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Section name is required")
    .max(10, "Max 10 characters allowed")
    .regex(/^[A-Za-z0-9- ]+$/, "Only letters, numbers allowed"),

  classId: z.string().min(1, "Please select a class"),
 capacity: z
  .string()
  .optional()
  .refine(
    (v) => !v || Number(v) > 0,
    {
      message:
        "Capacity must be greater than 0",
    }
  ),
});

export type SectionFormData = z.infer<typeof sectionSchema>;