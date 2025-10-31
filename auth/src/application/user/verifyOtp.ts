import { NextFunction } from "express";
import { Iotp } from "../../domain/entities/otp";
import { IUseCase } from "../../shared/IUseCase";
import { BadRequestError } from "@eduhublearning/common";
import { OtpRepository } from "../../infrastructure/db/repository/otpRepostory";

export class VerifyOtp implements IUseCase<{email:string,
       otp:string,
        next:NextFunction},Iotp|void> {
    constructor(private readonly _otpRepository:OtpRepository) {
        
    }
    public async execute(input: {email:string,
       otp:string,
        next:NextFunction}): Promise<void | Iotp> {
       try {
             const user = await this._otpRepository.findOtp(input.email);
             // console.log(user?.otp);
             if (!user) {
               throw new BadRequestError("OTP Expired");
             }
             if (user.otp == input.otp) {
               await this._otpRepository.deleteOtp(input.email);
               return user;
             } else {
               throw new BadRequestError("Invalid OTP");
             }
           } catch (err) {
             console.error(err);
             input.next(err);
           }
    }
}