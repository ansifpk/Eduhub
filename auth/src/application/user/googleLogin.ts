import { ForbiddenError, UserCreatedPublisher } from "@eduhublearning/common";
import { IUseCase } from "../../shared/IUseCase";
import { Producer } from "kafkajs";
import kafkaWrapper from "../../infrastructure/kafka/kafkaWrapper";
import { UserRepository } from "../../infrastructure/db/repository/userRepositories";
import { Encrypt } from "../../infrastructure/services/hashPassword";
import { JWTtocken } from "../../infrastructure/services/jwt";
import { Iuser } from "../../domain/entities/user";
import { IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { NextFunction } from "express";

export class GooogleLogin implements IUseCase<{email: string,
    name: string,
    password: string,
    next: NextFunction},{ user: Iuser; token: IToken } | void> {
    constructor(
        private readonly _userRepository:UserRepository,
        private readonly _encrypt:Encrypt,
        private readonly _jwtToken:JWTtocken,
    ) {
        
    }
    public async execute(input: {email: string,
    name: string,
    password: string,
    next: NextFunction}): Promise<{ user: Iuser; token: IToken } | void>  {
        try {
      const checkUser = await this._userRepository.findByEmail(input.email);
      console.log("checking",checkUser);
      console.log("input",input);
      
      if (!checkUser) {
        input.password = await this._encrypt.createHash(input.password);
        const user = await this._userRepository.create({
          email:input.email,
          name:input.name,
          password:input.password,
        });
        if (user) {
          await new UserCreatedPublisher(
            kafkaWrapper.producer as Producer
          ).produce({
            _id: user._id! as string,
            name: user.name as string,
            email: user.email as string,
            isInstructor: user.isInstructor! as boolean,
            password: user.password,
            createdAt: user.createdAt!,
          });
          const token: any = await this._jwtToken.createAccessAndRefreashToken(
            user._id as string
          );
          if (token) {
            return { user, token };
          }
        }
      } else {
        if (checkUser.isBlock) {
          throw new ForbiddenError();
        } else {
          const token: any = await this._jwtToken.createAccessAndRefreashToken(
            checkUser._id as string
          );
          if (token) {
            return { user: checkUser, token };
          }
        }
      }
    } catch (error) {
      console.error(error);

      input.next(error);
    }
    }
}