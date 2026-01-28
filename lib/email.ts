// EmailJS logic
import emailjs from "@emailjs/browser";

export const sendWelcomeEmail = async (
  email: string,
  name: string,
) => {
  try {
    // Send both lowercase and uppercase keys to match common template variable styles
    const templateParams = {
      user_name: name ,
      user_email: email,
    };

    // Debug: log params so we can verify values in the browser console
    // Remove these logs in production.
    console.log("EmailJS sendWelcomeEmail: templateParams=", templateParams);

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    console.log("EmailJS send result:", result);
  } catch (err) {
    console.error("sendWelcomeEmail failed:", err);
  }
};