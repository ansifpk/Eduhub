import { Iuser } from "../../../entities/user";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface IGoogleLogin {
    execute(input: {email: string,
        name: string,
        password: string}): Promise<{ user: Iuser; token: IToken } | void>
}