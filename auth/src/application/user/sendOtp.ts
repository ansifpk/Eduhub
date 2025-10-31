import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { OtpRepository } from "../../infrastructure/db/repository/otpRepostory";
import { SentEmail } from "../../infrastructure/services/sendMail";
import { OtpGenerator } from "../../infrastructure/services/otpGenerator";

export class SendOtp
  implements IUseCase<{ email: string; next: NextFunction }, any>
{
  constructor(
    private readonly _otpRepository: OtpRepository,
    private readonly _otpGenerate: OtpGenerator,
    private readonly _sentEmail: SentEmail
  ) {}
  public async execute(input: {
    email: string;
    next: NextFunction;
  }): Promise<any> {
    try {
      const data = await this._otpRepository.deleteOtp(input.email);
      const otp = await this._otpGenerate.createOtp();
      console.log("new otp", otp, input.email);
      await this._otpRepository.createOtp(input.email, otp);
      await this._sentEmail.sentEmailVerification(input.email, otp);
      return data;
    } catch (error) {
      input.next(error);
    }
  }
}
