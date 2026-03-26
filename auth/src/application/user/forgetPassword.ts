import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IUserRepository } from "../../domain/interfaces/user/repository/IuserRepository";
import { IOtpGenerator } from "../../domain/interfaces/serviceInterfaces/IOtpagenerator";
import { IOtpRepository } from "../../domain/interfaces/IOtpRepository";
import { ISentEmail } from "../../domain/interfaces/serviceInterfaces/ISentEmail";
import { IForgetPassword } from "../../domain/interfaces/user/useCases/IForgetPassword";

export class ForgetPassword implements IForgetPassword{
    constructor(
        private readonly _userRepository:IUserRepository,
        private readonly _otpGenerate:IOtpGenerator,
        private readonly _otpRepository:IOtpRepository,
        private readonly _sentEmail:ISentEmail
    ) {
        
    }
    public async execute(input: {email:string}): Promise<any|void> {
        try {
              let checkuser = await this._userRepository.findByEmail(input.email);
              if (!checkuser) {
                throw new BadRequestError(ErrorMessages.EMAIL_NOT_REGISTERED);
              }
              const otp = await this._otpGenerate.createOtp();
              console.log("otp to change pass", otp);
              await this._otpRepository.createOtp(checkuser.email, otp);
              await this._sentEmail.sentEmailVerification(checkuser.email, otp);
              return checkuser;
            } catch (err) {
              
              console.error(err);
              throw err;
            }
    }
}