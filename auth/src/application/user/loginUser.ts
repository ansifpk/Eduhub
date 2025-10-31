import { NextFunction } from "express";
import { IUseCase } from "../../shared/IUseCase";
import { IUserRepository } from "../../domain/interfaces/IuserRepository";
import { BadRequestError, ForbiddenError } from "@eduhublearning/common";
import { JWTtocken } from "../../infrastructure/services/jwt";
import { Encrypt } from "../../infrastructure/services/hashPassword";
import { Iuser } from "../../domain/entities/user";
import { IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";



export class LoginUser implements IUseCase<{email:string,
        password:string,
        next:NextFunction},{ user: Iuser; token: IToken } | void> {
    constructor(
        public readonly _userRepository:IUserRepository,
        public readonly _encrypt:Encrypt,
        public readonly _jwtToken:JWTtocken,
    ) {
        
    }
    public async execute(input: {email:string,
        password:string,
        next:NextFunction}): Promise<{ user: Iuser; token: IToken } | void> {

        try {
              const user = await this._userRepository.findByEmail(input.email);
        
              if (!user) {
                throw new BadRequestError("Invalid credentials");
              }
              if (user.isBlock == true) {
                throw new ForbiddenError();
              }
        
              const checkPassword = await this._encrypt.comparePassword(
                input.password,
                user.password
              );
        
              if (!checkPassword) {
                throw new BadRequestError("incorrect password");
              }
        
              const token: any = await this._jwtToken.createAccessAndRefreashToken(
                user._id as string
              );
        
              return { token, user };
            } catch (err) {
              console.error(err);
              input.next(err);
            }

    }
}