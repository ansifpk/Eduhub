import { ILoginUserResponseDto } from "../../../../application/dtos/user/LoginUserResponseDto ";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface ILoginUser {
   execute(input: {email:string,
           password:string}): Promise<{ user: ILoginUserResponseDto; token: IToken } | void>
}