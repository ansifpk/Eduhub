import { Iuser } from "../../../entities/user";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface ICreateUser {
    execute(input:{token: string, otp: string}): Promise<{ user: Iuser; tokens: IToken } | void>
}