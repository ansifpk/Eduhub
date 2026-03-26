
import { Iuser } from "../../domain/entities/user";
import { IJwt, IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ICreateUser } from "../../domain/interfaces/user/useCases/ICreateUser";
import { IUserRepository } from "../../domain/interfaces/user/repository/IuserRepository";
import { IOtpRepository } from "../../domain/interfaces/IOtpRepository";
import { mapUserToLoginDto } from "../mapers/user/mapUserToLoginDto";
import { ILoginUserResponseDto } from "../dtos/user/LoginUserResponseDto ";



export class CreateUser implements ICreateUser {
    constructor(
        private readonly _userRepository:IUserRepository,
        private readonly _jwtToken:IJwt,
        private readonly _otpRepository:IOtpRepository
    ) {}

    public async execute(input: {token: string, otp: string}): Promise<{ user: ILoginUserResponseDto; tokens: IToken } | void> {
        try {
              const decoded = (await this._jwtToken.verifyJwt(input.token)) as Iuser;
              const result = await this._otpRepository.findOtp(decoded.email);

              if (!result) {
                throw new BadRequestError(ErrorMessages.OTP_EXPIRED);
              }
        
              if (Number(result.otp) !== Number(input.otp)) {
                throw new BadRequestError(ErrorMessages.INVALID_OTP);
              }
        
              const user = (await this._userRepository.create(decoded)) as Iuser
              const tokens = (await this._jwtToken.createAccessAndRefreashToken(
                user._id!
              )) as IToken;
        
              if (tokens) {
                await this._otpRepository.deleteOtp(decoded.email);
                const userDto = mapUserToLoginDto(user);
                return { user:userDto, tokens };
              }
            } catch (err) {
              console.error(err);
              throw err;
            }
    }
    
}