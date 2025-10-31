import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { Iuser } from "../../domain/entities/user";
import { UserRepository } from "../../infrastructure/db/repository/userRepositories";
import { BadRequestError } from "@eduhublearning/common";
import { OtpRepository } from "../../infrastructure/db/repository/otpRepostory";

export class ChangeEmail implements IUseCase<{ userId: string,
    email: string,
    otp: string,
    next: NextFunction},Iuser | void> {
    constructor(
        private readonly _userRepository:UserRepository,
        private readonly _otpRepository:OtpRepository
    ) {
        
    }
    public async execute(input: { userId: string,
        email: string,
        otp: string,
        next: NextFunction}): Promise<Iuser | void> {
        try {
              
              const checkUser = await this._userRepository.findById(input.userId);
              if (!checkUser) {
                throw new BadRequestError("User Not Found");
              }
        
              const findOTP = await this._otpRepository.findOtp(input.email);
              if (!findOTP) {
                throw new BadRequestError("OTP expired");
              }
              if (findOTP.otp !== input.otp) {
                throw new BadRequestError("Invalid OTP");
              }
        
              const user = await this._userRepository.changeEmail(input.userId, input.email);
              if (user) {
                await this._otpRepository.deleteOtp(input.email);
                return user;
              }
            } catch (error) {
              console.error(error);
              input.next(error);
            }
    }
}