import { NonRetriableError } from "inngest";
import User from "../../models/user";
import { inngest } from "../client";
import { sendMail } from "../../utils/mailer";
import user from "../../models/user";

export const onSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 3 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;
      await step.run("get-user-email", async () => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new NonRetriableError("User no longer exists in database");
        }
        return user;
      });

      await step.run("send-welcome-email", async () => {
        const subject = "Welcome to Our Ticketing System!";
        const message = `Hello ${event.data.username},\n\nThank you for signing up! We're excited to have you on board. If you have any questions, feel free to reach out.\n\nBest regards,\nThe Ticketing System Team`;

        await sendMail("HD", user.email, subject, message);
      });

      console.log("user set up successfully");
      return {
        status: "success",
        message: "Welcome email sent successfully",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      };
    } catch (error) {
      console.error("Error processing signup event:", error);
      return { success: false, error: error.message };
    }
  }
);
