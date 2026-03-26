import { ILoginUserResponseDto } from "../../../../application/dtos/user/LoginUserResponseDto ";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface IGoogleLogin {
    execute(input: {email: string,
        name: string,
        password: string}): Promise<{ user: ILoginUserResponseDto; token: IToken } | void>
}