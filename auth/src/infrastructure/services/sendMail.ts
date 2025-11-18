import nodeMailer from "nodemailer";
import { ISentEmail } from "../../domain/interfaces/serviceInterfaces/ISentEmail";

export class SentEmail implements ISentEmail {
  async sentEmailVerification(email: string, otp: string): Promise<any> {
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const sentVerificationEmail = async (toEmail: string, otp: string) => {
      //  mail options
      try {
        const mailOptions = {
          from: process.env.EMAIL,
          to: toEmail,
          subject: "Verify Your email",
          html: `Your OTP is: ${otp}`,
        };
        const info = await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error("Error sending email:", error);
        return error;
      }
    };
    await sentVerificationEmail(email, otp);
  }
}
