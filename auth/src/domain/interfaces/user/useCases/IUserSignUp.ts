import { Iuser } from "../../../entities/user";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface IUserSignUp{
    execute(input: {user:Iuser}): Promise<string | void> 
}