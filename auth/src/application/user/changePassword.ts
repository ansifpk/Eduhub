import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { IChangePassword } from "../../domain/interfaces/user/useCases/IChangePassword";
import { IUserRepository } from "../../domain/interfaces/user/repository/IuserRepository";
import { IOtpRepository } from "../../domain/interfaces/IOtpRepository";
import { IHashPassword } from "../../domain/interfaces/serviceInterfaces/IHashPassword";

export class ChangePassword implements IChangePassword{
    constructor(
        private readonly _userRepository:IUserRepository,
        private readonly _otpRepository:IOtpRepository,
        private readonly _encrypt:IHashPassword,
    ) {
        
    }
    public async execute(input: { email:string,
        password:string,
        confirmPassword:string}
      ): Promise<Iuser|void> {
        try {
              const user = await this._userRepository.findByEmail(input.email);
              if (!user) {
                throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
              }
              if (!input.password) {
                throw new BadRequestError(ErrorMessages.NEW_PASSWORD_REQUIRED);
              }
              if (!input.confirmPassword) {
                throw new BadRequestError(ErrorMessages.CONFIRM_PASSWORD_REQUIRED);
              }
              if (input.confirmPassword !== input.password) {
                throw new BadRequestError(
                  ErrorMessages.CONFIRM_AND_NEW_PASSWORD_IS_NOT_MATCHING
                );
              }
              const compare = await this._encrypt.comparePassword(
                input.password,
                user.password
              );
              if (compare) {
                throw new BadRequestError(ErrorMessages.OLD_AND_NEW_PASSWORD_IS_SAME);
              }
         
              const newPassword = await this._encrypt.createHash(input.password);
              await this._userRepository.updatePassword(user._id!, newPassword);
              await this._otpRepository.deleteOtp(input.email);
              return user;
            } catch (err) {
             console.error(err);
             throw err;
            }
    }
}