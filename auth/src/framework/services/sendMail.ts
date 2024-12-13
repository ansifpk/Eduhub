import nodeMailer from 'nodemailer';
import { ISentEmail } from '../../useCase/interface/serviceInterface/ISentEmail';

export class SentEmail implements ISentEmail{
    async sentEmailVerification(name: string, email: string, otp: string): Promise<any> {
        let transporter = nodeMailer.createTransport({
                        service: 'gmail',
                      
                        auth: {
                            user: 'pkansif39@gmail.com',
                            pass: 'tvtq zgcc skhn rliu'
                        }
        });
        const sentVerificationEmail = async (name:string,toEmail:string,otp:string)=>{
                //  mail options
                try {
            const mailOptions = {
               from: 'pkansif39@gmail.com',
               to: 'pkansif39@gmail.com',
               subject: "Verify Your email",
               html: `Your OTP is: ${otp}`
           };
            const info = await transporter.sendMail(mailOptions);
            // console.log('Email sent:'+info.response)
          } catch (error) {
            console.error('Error sending email:',error)
            return error
          }
        }
        await   sentVerificationEmail(name,email,otp);
    }

} 



