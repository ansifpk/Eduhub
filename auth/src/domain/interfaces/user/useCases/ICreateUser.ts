import { ILoginUserResponseDto } from "../../../../application/dtos/user/LoginUserResponseDto ";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface ICreateUser {
    execute(input:{token: string, otp: string}): Promise<{ user: ILoginUserResponseDto; tokens: IToken } | void>
}