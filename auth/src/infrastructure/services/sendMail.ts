import nodeMailer from "nodemailer";
import { ISentEmail } from "../../domain/interfaces/serviceInterfaces/ISentEmail";

export class SentEmail implements ISentEmail {
  async sentEmailVerification(email: string, otp: string): Promise<any> {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      pool: false,
    } as any); // TypeScript workaround

    try {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verify Your email",
        html: `Your OTP is: ${otp}`,
      };
      
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    } finally {
      transporter.close(); // ✅ This is the critical fix
    }
  }
}