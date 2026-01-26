// EmailJS logic
import emailjs from "@emailjs/browser";

export const sendWelcomeEmail = async (email: string) => {
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    { user_email: email },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );
};
