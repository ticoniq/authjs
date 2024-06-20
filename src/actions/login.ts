"use server";
import * as zod from "zod";
import { LoginSchema } from "@/lib/auth/validation";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
  generateVerificationToken,
  generateTwofactorToken,
} from "@/lib/auth/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";

export const login = async (
  values: zod.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    return { error: "Invalid email or password" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid 2FA code" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid 2FA code" };
      }

      const hasExpired = new Date(twoFactorToken.expiresAt) < new Date();
      if (hasExpired) {
        return { error: "2FA code has expired" };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConnection = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConnection) {
        await prisma.twoFactorAuthentication.delete({
          where: {
            id: existingConnection.id,
          },
        });
      }

      await prisma.twoFactorAuthentication.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwofactorToken(existingUser.email);

      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        case "AccessDenied":
          return { error: "Email not verified" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
