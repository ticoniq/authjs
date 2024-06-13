"use server";
import * as zod from 'zod';
import { LoginSchema } from '@/lib/auth/validation';

export const login = async (values: Zod.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields"}
  }

  return { success: "Email sent!" }
};