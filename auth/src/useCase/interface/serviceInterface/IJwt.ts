import { Iuser } from "../../../entities/user"

export interface IToken {
    accessToken:string,
    refreshToken:string,
    role?:string
}

export interface IJwt{
    createVerificationJwt(payload:Iuser):Promise<string>
    createAccessAndRefreashToken(id:string): Promise <object>
    frogetPassword(id:string): Promise <string>
    verifyJwt(token:string): Promise <Object>
}