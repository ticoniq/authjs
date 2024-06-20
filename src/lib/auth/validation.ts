import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  code: z.string().optional(),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email("email address is required"),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string().min(1, { message: "Name cannot be empty" })),
    email: z.optional(z.string().email({ message: "Invalid email" })),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    password: z.optional(
      z.string().min(6, { message: "Old Password is required" })
    ),
    newPassword: z.optional(
      z.string().min(6, { message: "New Password is required" })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      if (!data.password && data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Both password fields are required",
      path: ["newPassword"],
    }
  );
