import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password cannot exceed 20 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;


export const registerSchema = z.object({
  schoolName: z.string().min(2, { message: "School name is required" }),

  schoolEmail: z
    .string()
    .email({ message: "Enter valid school email" }),

  adminName: z.string().min(2, { message: "Admin name is required" }),

  adminEmail: z
    .string()
    .email({ message: "Enter valid admin email" }),

  password: z
    .string()
    .min(6, { message: "Minimum 6 characters" })
    .max(20, { message: "Maximum 20 characters" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;



export const roleSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Role name must be at least 3 characters" }),

  description: z
    .string()
    .min(5, { message: "Description is required (min 5 chars)" }),
});

export type RoleFormData = z.infer<typeof roleSchema>;


export const assignPermissionSchema = z.object({
  roleId: z.string().min(1, "Please select a role"),
  privileges: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, "Select at least one permission"),
});

export type AssignPermissionFormData = z.infer<typeof assignPermissionSchema>;


export const subjectSchema = z.object({
  classId: z.string().min(1, "Please select a class"),

  name: z
    .string()
    .min(2, "Subject name must be at least 2 characters")
    .max(50, "Subject name too long"),

  description: z
    .string()
    .max(200, "Description max 200 characters")
    .optional(),
});

export type SubjectFormData = z.infer<typeof subjectSchema>;


export const classSchema = z.object({
  name: z
    .string()
    .min(2, "Class name must be at least 2 characters"),

  studentLimit: z
    .string()
    .min(1, "Student limit required")
    .refine((val) => Number(val) > 0, {
      message: "Must be greater than 0",
    }),

  gradeId: z.string().min(1, "Please select a grade"),
});

export type ClassFormData = z.infer<typeof classSchema>;