import { Iuser } from "../../../entities/user";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface ILoginUser {
   execute(input: {email:string,
           password:string}): Promise<{ user: Iuser; token: IToken } | void>
}