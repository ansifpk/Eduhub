import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { BadRequestError } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepositories";
import { OtpGenerator } from "../../infrastructure/services/otpGenerator";
import { OtpRepository } from "../../infrastructure/db/repository/otpRepostory";
import { SentEmail } from "../../infrastructure/services/sendMail";

export class ForgetPassword implements IUseCase<{email:string, next:NextFunction},any> {
    constructor(
        private readonly _userRepository:UserRepository,
        private readonly _otpGenerate:OtpGenerator,
        private readonly _otpRepository:OtpRepository,
        private readonly _sentEmail:SentEmail
    ) {
        
    }
    public async execute(input: {email:string, next:NextFunction}): Promise<any> {
        try {
              let checkuser = await this._userRepository.findByEmail(input.email);
              if (!checkuser) {
                throw new BadRequestError("Email Not Registerd");
              }
              const otp = await this._otpGenerate.createOtp();
              console.log("otp to change pass", otp);
              await this._otpRepository.createOtp(checkuser.email, otp);
              await this._sentEmail.sentEmailVerification(checkuser.email, otp);
              return checkuser;
            } catch (err) {
              input.next(err);
              console.error(err);
            }
    }
}