import nodemailer from "nodemailer";

export const sendMail = async (from, to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASSWORD,
      },
    });
    const info = await transporter.sendMail({ from, to, subject, text });
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("❌ Mail error:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};
