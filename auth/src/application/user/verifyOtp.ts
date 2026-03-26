import { Iotp } from "../../domain/entities/otp";
import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IVerifyOtp } from "../../domain/interfaces/user/useCases/IVerifyOtp";
import { IOtpRepository } from "../../domain/interfaces/IOtpRepository";

export class VerifyOtp implements IVerifyOtp {
    constructor(private readonly _otpRepository:IOtpRepository) {
        
    }
    public async execute(input: {email:string,
       otp:string}): Promise<void | Iotp> {
       try {
             const user = await this._otpRepository.findOtp(input.email);
             // console.log(user?.otp);
             if (!user) {
               throw new BadRequestError(ErrorMessages.OTP_EXPIRED);
             }
             if (user.otp == input.otp) {
               await this._otpRepository.deleteOtp(input.email);
               return user;
             } else {
               throw new BadRequestError(ErrorMessages.INVALID_OTP);
             }
           } catch (err) {
             console.error(err);
             throw err;
           }
    }
}