
import { IOtpRepository } from "../../domain/interfaces/IOtpRepository";
import { IOtpGenerator } from "../../domain/interfaces/serviceInterfaces/IOtpagenerator";
import { ISentEmail } from "../../domain/interfaces/serviceInterfaces/ISentEmail";
import { ISendOtp } from "../../domain/interfaces/user/useCases/ISendOtp";

export class SendOtp implements ISendOtp{
  constructor(
    private readonly _otpRepository: IOtpRepository,
    private readonly _otpGenerate: IOtpGenerator,
    private readonly _sentEmail: ISentEmail
  ) {}
  public async execute(input: {
    email: string;
    
  }): Promise<boolean|void> {
    try {
      const data = await this._otpRepository.deleteOtp(input.email);
      const otp = await this._otpGenerate.createOtp();
      console.log("new otp", otp, input.email);
      await this._otpRepository.createOtp(input.email, otp);
      await this._sentEmail.sentEmailVerification(input.email, otp);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
