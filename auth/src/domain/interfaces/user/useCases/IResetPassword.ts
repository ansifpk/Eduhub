import { Iuser } from "../../../entities/user";

export interface IResetPassword {
     execute(input: {userId:string,password:string,newPassword:string,conPassword:string}): Promise<Iuser|void>
}