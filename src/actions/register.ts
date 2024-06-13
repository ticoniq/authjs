"use server";
import * as zod from 'zod';
import { RegisterSchema } from '@/lib/auth/validation';

export const register = async (values: Zod.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields"}
  }

  console.log("Registering user with values:", values);
  return { success: "Email sent!" }
};