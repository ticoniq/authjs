import * as zod from 'zod';

export const LoginSchema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(1, "Password is required"),
});

export const RegisterSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email("Invalid email address"),
  password: zod.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
});
