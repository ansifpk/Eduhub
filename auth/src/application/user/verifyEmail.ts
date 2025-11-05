import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IUseCase } from "../../shared/IUseCase";
import { UserRepository } from "../../infrastructure/db/repository/userRepositories";
import { OtpGenerator } from "../../infrastructure/services/otpGenerator";
import { OtpRepository } from "../../infrastructure/db/repository/otpRepostory";
import { SentEmail } from "../../infrastructure/services/sendMail";
import { NextFunction } from "express";

export class VerifyEmail implements IUseCase<{userId:string,email:string,next:NextFunction},string|void> {
    constructor(
        private readonly _userRepository:UserRepository,
        private readonly _otpGenerate:OtpGenerator,
        private readonly _otpRepository:OtpRepository,
        private readonly _sentEmail:SentEmail,
    ) {
        
    }
    public async execute(input: {userId:string,email:string,next:NextFunction}): Promise<string|void> {
         try {
              if(!/^[A-Za-z0-9.%+-]+@gmail\.com$/.test(input.email)){
                throw new BadRequestError(ErrorMessages.EMAIL_VALIDATION);
              }
              const checkuser = await this._userRepository.findById(input.userId);
              if (!checkuser) {
                throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
              }
              if (checkuser.email == input.email) {
                throw new BadRequestError(ErrorMessages.OLD_AND_NEW_EMAIL_IS_SAME);
              }
              const checkEmail = await this._userRepository.findByEmail(input.email);
              if (checkEmail) {
                throw new BadRequestError(ErrorMessages.EMAIL_CONFILICT);
              }
        
              const OTP = await this._otpGenerate.createOtp();
              console.log("otp to change email", OTP);
              await this._otpRepository.createOtp(input.email, OTP);
              await this._sentEmail.sentEmailVerification(input.email, OTP);
              return OTP;
            } catch (error) {
              console.error(error);
              input.next(error);
            }
    }
}