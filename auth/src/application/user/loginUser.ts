import { BadRequestError, ErrorMessages, ForbiddenError } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { IJwt, IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { IUserRepository } from "../../domain/interfaces/user/repository/IuserRepository";
import { IHashPassword } from "../../domain/interfaces/serviceInterfaces/IHashPassword";
import { ILoginUser } from "../../domain/interfaces/user/useCases/ILoginUser";



export class LoginUser implements ILoginUser {
    constructor(
        public readonly _userRepository:IUserRepository,
        public readonly _encrypt:IHashPassword,
        public readonly _jwtToken:IJwt,
    ) {
        
    }
    public async execute(input: {email:string,
        password:string}): Promise<{ user: Iuser; token: IToken } | void> {

        try {
              let user = await this._userRepository.findByEmail(input.email);
        
              if (!user) {
                throw new BadRequestError(ErrorMessages.INVALID_CREDENCIALS);
              }
              if (user.isBlock == true) {
                throw new ForbiddenError();
              }
        
              const checkPassword = await this._encrypt.comparePassword(
                input.password,
                user.password
              );
        
              if (!checkPassword) {
                throw new BadRequestError(ErrorMessages.INVALID_CREDENCIALS);
              }
        
              const token: any = await this._jwtToken.createAccessAndRefreashToken(
                user._id as string
              );
              return { token, user };
            } catch (err) {
              console.error(err);
             throw err;
            }

    }
}