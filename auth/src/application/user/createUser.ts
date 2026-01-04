import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { Iuser } from "../../domain/entities/user";
import { IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { JWTtocken } from "../../infrastructure/services/jwt";
import { UserRepository } from "../../infrastructure/db/repository/userRepositories";
import { OtpRepository } from "../../infrastructure/db/repository/otpRepostory";



export class CreateUser implements IUseCase<{token: string, otp: string,next: NextFunction},{ user: Iuser; tokens: IToken } | void> {
    constructor(
        private readonly _userRepository:UserRepository,
        private readonly _jwtToken:JWTtocken,
        private readonly _otpRepository:OtpRepository
    ) {}

    public async execute(input: {token: string, otp: string,next: NextFunction}): Promise<{ user: Iuser; tokens: IToken } | void> {
        try {
              const decoded = (await this._jwtToken.verifyJwt(input.token)) as Iuser;
              const result = await this._otpRepository.findOtp(decoded.email);

              if (!result) {
                throw new BadRequestError(ErrorMessages.OTP_EXPIRED);
              }
        
              if (Number(result.otp) !== Number(input.otp)) {
                throw new BadRequestError(ErrorMessages.INVALID_OTP);
              }
        
              const user = (await this._userRepository.create(decoded)) as Iuser;
              const tokens = (await this._jwtToken.createAccessAndRefreashToken(
                user._id!
              )) as IToken;
        
              if (tokens) {
                await this._otpRepository.deleteOtp(decoded.email);
                return { user, tokens };
              }
            } catch (err) {
              console.error(err);
              input.next(err);
            }
    }
    
}