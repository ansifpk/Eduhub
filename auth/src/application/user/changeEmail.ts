import { Iuser } from "../../domain/entities/user";
import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IChangeEmail } from "../../domain/interfaces/user/useCases/IChangeEmail";
import { IUserRepository } from "../../domain/interfaces/user/repository/IuserRepository";
import { IOtpRepository } from "../../domain/interfaces/IOtpRepository";
import { mapUserToChangeEmailDto } from "../mapers/user/mapUserToChangeEmailDto";
import { IChangeEmailResponseDto } from "../dtos/user/ChangeEmailResponseDto";

export class ChangeEmail implements IChangeEmail {
    constructor(
        private readonly _userRepository:IUserRepository,
        private readonly _otpRepository:IOtpRepository
    ) {
        
    }
    public async execute(input: { userId: string,
        email: string,
        otp: string,
        }): Promise<IChangeEmailResponseDto | void> {
        try {
              
              const checkUser = await this._userRepository.findById(input.userId);
              if (!checkUser) {
                throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
              }
        
              const findOTP = await this._otpRepository.findOtp(input.email);
              if (!findOTP) {
                throw new BadRequestError(ErrorMessages.OTP_EXPIRED);
              }
              if (findOTP.otp !== input.otp) {
                throw new BadRequestError(ErrorMessages.INVALID_OTP);
              }
        
              const user = await this._userRepository.changeEmail(input.userId, input.email);
              if (user) {
                await this._otpRepository.deleteOtp(input.email);
                return mapUserToChangeEmailDto(user);
              }
            } catch (error) {
              console.error(error);
              throw error;
            }
    }
}