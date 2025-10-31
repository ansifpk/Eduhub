import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { UserRepository } from "../../infrastructure/db/repository/userRepositories";
import { BadRequestError } from "@eduhublearning/common";
import { Encrypt } from "../../infrastructure/services/hashPassword";
import { OtpRepository } from "../../infrastructure/db/repository/otpRepostory";
import { Iuser } from "../../domain/entities/user";

export class ChangePassword implements IUseCase<{ email:string,
        password:string,
        confirmPassword:string,
        next:NextFunction},Iuser|void> {
    constructor(
        private readonly _userRepository:UserRepository,
        private readonly _otpRepository:OtpRepository,
        private readonly _encrypt:Encrypt,
    ) {
        
    }
    public async execute(input: { email:string,
        password:string,
        confirmPassword:string,
        next:NextFunction}): Promise<Iuser|void> {
        try {
              const user = await this._userRepository.findByEmail(input.email);
              if (!user) {
                throw new BadRequestError("User Not Found");
              }
              if (!input.password) {
                throw new BadRequestError("New Password is Required");
              }
              if (!input.confirmPassword) {
                throw new BadRequestError("Confirm Password is Required");
              }
              if (input.confirmPassword !== input.password) {
                throw new BadRequestError(
                  "Confirm Password and password is not maching"
                );
              }
              const compare = await this._encrypt.comparePassword(
                input.password,
                user.password
              );
              if (compare) {
                throw new BadRequestError("You Cannot Set Old Password Again");
              }
         
              const newPassword = await this._encrypt.createHash(input.password);
              await this._userRepository.updatePassword(user._id!, newPassword);
              await this._otpRepository.deleteOtp(input.email);
              return user;
            } catch (err) {
              console.error(err);
             input. next(err);
            }
    }
}