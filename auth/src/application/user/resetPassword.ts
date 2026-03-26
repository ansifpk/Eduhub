import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { IResetPassword } from "../../domain/interfaces/user/useCases/IResetPassword";
import { IUserRepository } from "../../domain/interfaces/user/repository/IuserRepository";
import { IHashPassword } from "../../domain/interfaces/serviceInterfaces/IHashPassword";

export class ResetPassword implements IResetPassword {
    constructor(
        private readonly _userRepository:IUserRepository,
        private readonly _encrypt:IHashPassword
    ) {}
    public async execute(input: {userId:string,password:string,newPassword:string,conPassword:string}): Promise<Iuser|void> {
        try {
              const user = await this._userRepository.findById(input.userId);
              if (!user) {
                throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
              }
              if (input.newPassword.length < 6 || input.newPassword.length > 20) {
                throw new BadRequestError(ErrorMessages.PASSWORD_VALIDATION);
              }
              const checkPassword = await this._encrypt.comparePassword(
                input.password,
                user.password
              );
              if (!checkPassword) {
                throw new BadRequestError(ErrorMessages.CURRENT_PASSWORD_NOT_MATCHING);
              }
              if (input.password == input.newPassword) {
                throw new BadRequestError(ErrorMessages.OLD_AND_NEW_PASSWORD_IS_SAME);
              }
              if (input.newPassword !== input.conPassword) {
                throw new BadRequestError(ErrorMessages.CONFIRM_AND_NEW_PASSWORD_IS_NOT_MATCHING);
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
              throw err;
            }
    }
}