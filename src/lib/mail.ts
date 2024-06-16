import { Resend } from "resend";
import authConfirmation from "@/components/EmailTemplate/authConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const ConfirmLink = `http://localhost:3000/auth/confirm?token=${token}`;
  await resend.emails.send({
    from: "Jobconiq <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your email",
    html: `<p> Click the following link to verify your email <a href="${ConfirmLink}"> Verify Email </a> </p>`,
    react: authConfirmation({ link: ConfirmLink }),
  });
};
