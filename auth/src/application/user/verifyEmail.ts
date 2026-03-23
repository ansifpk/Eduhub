import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IVerifyEmail } from "../../domain/interfaces/user/useCases/IVerifyEmail";
import { IUserRepository } from "../../domain/interfaces/user/repository/IuserRepository";
import { IOtpGenerator } from "../../domain/interfaces/serviceInterfaces/IOtpagenerator";
import { IOtpRepository } from "../../domain/interfaces/IOtpRepository";
import { ISentEmail } from "../../domain/interfaces/serviceInterfaces/ISentEmail";

export class VerifyEmail implements IVerifyEmail {
    constructor(
        private readonly _userRepository:IUserRepository,
        private readonly _otpGenerate:IOtpGenerator,
        private readonly _otpRepository:IOtpRepository,
        private readonly _sentEmail:ISentEmail,
    ) {
        
    }
    public async execute(input: {userId:string,email:string}): Promise<string|void> {
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
              throw error;
            }
    }
}