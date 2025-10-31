import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { BadRequestError } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepositories";
import { Encrypt } from "../../infrastructure/services/hashPassword";
import { Iuser } from "../../domain/entities/user";

export class ResetPassword implements IUseCase<{userId:string,password:string,newPassword:string,conPassword:string, next:NextFunction},Iuser|void> {
    constructor(
        private readonly _userRepository:UserRepository,
        private readonly _encrypt:Encrypt
    ) {}
    public async execute(input: {userId:string,password:string,newPassword:string,conPassword:string, next:NextFunction}): Promise<Iuser|void> {
        try {
              const user = await this._userRepository.findById(input.userId);
              if (!user) {
                throw new BadRequestError("User Not Found");
              }
              if (input.newPassword.length < 6 || input.newPassword.length > 20) {
                throw new BadRequestError("Password should be in between 6 and 20");
              }
              const checkPassword = await this._encrypt.comparePassword(
                input.password,
                user.password
              );
              if (!checkPassword) {
                throw new BadRequestError("Current password is not matching");
              }
              if (input.password == input.newPassword) {
                throw new BadRequestError("You cannot set the old password again");
              }
              if (input.newPassword !== input.conPassword) {
                throw new BadRequestError("Confirm password is not matching");
              }
              const Password = await this._encrypt.createHash(input.newPassword);
              const updatedUser = await this._userRepository.updatePassword(
                input.userId,
                Password
              );
              if (updatedUser) {
                return updatedUser;
              }
            } catch (err) {
              console.error(err);
              input.next(err);
            }
    }
}