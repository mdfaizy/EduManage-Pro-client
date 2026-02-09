import { z } from "zod";

export const createGradeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Grade name must be at least 2 characters")
    .max(50, "Grade name must be less than 50 characters"),

description: z
    .string()
    .trim()
    .min(5, "Description is required")
    .max(200, "Description must be less than 200 characters"),
});

export type CreateGradeInput = z.infer<typeof createGradeSchema>;
