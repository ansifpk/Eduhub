import { ForbiddenError, UserCreatedPublisher } from "@eduhublearning/common";
import { Producer } from "kafkajs";
import kafkaWrapper from "../../infrastructure/kafka/kafkaWrapper";
import { IJwt, IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { IGoogleLogin } from "../../domain/interfaces/user/useCases/IGoogleLogin";
import { IUserRepository } from "../../domain/interfaces/user/repository/IuserRepository";
import { IHashPassword } from "../../domain/interfaces/serviceInterfaces/IHashPassword";
import { mapUserToLoginDto } from "../mapers/user/mapUserToLoginDto";
import { ILoginUserResponseDto } from "../dtos/user/LoginUserResponseDto ";

export class GooogleLogin implements IGoogleLogin {
    constructor(
        private readonly _userRepository:IUserRepository,
        private readonly _encrypt:IHashPassword,
        private readonly _jwtToken:IJwt,
    ) {
        
    }
    public async execute(input: {email: string,
    name: string,
    password: string}): Promise<{ user: ILoginUserResponseDto; token: IToken } | void>  {
        try {
      const checkUser = await this._userRepository.findByEmail(input.email);
     
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
            const userDTo = mapUserToLoginDto(user);
            return { user:userDTo, token };
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
            const userDTo = mapUserToLoginDto(checkUser);
            return { user:userDTo , token };
          }
        }
      }
    } catch (error) {
      console.error(error);

     throw error
    }
    }
}