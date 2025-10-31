import nodeMailer from "nodemailer";
import { ISentEmail } from "../../domain/interfaces/service/ISentMail";

export class SentEmail implements ISentEmail {
  async sentSuccessMailToVideoUploading(
    email: string,
    courseName: string
  ): Promise<any> {
    try {
      let transporter = nodeMailer.createTransport({
        service: "gmail",

        auth: {
          user: "pkansif39@gmail.com",
          pass: "tvtq zgcc skhn rliu",
        },
      });
      const sentEmail = async (email: string, courseName: string) => {
        try {
          const mailOptions = {
            from: "pkansif39@gmail.com",
            to: email,
            subject: `Your videos for ${courseName} course uploaded successfully .
                                      now you can manage your course. thank you for using EduHub `,
          };
          const info = await transporter.sendMail(mailOptions);
        } catch (error) {
          console.error(error);
        }
      };

      await sentEmail(email, courseName);
    } catch (error) {
      console.error(error);
    }
  }
}
