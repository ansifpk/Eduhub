import { JwtPayload } from "jsonwebtoken"
import { Iuser } from "../../entities/user"

export interface IToken {
    accessToken:string,
    refreshToken:string,
    role?:string
}
interface payload {
    "id": string,
    "iat": number,
    "exp": number
}

export interface IJwt{
    createVerificationJwt(payload:Iuser):Promise<string>
    createAccessAndRefreashToken(id:string): Promise <IToken>
    frogetPassword(id:string): Promise <string>
    verifyJwt(token:string): Promise <Object>
    verifyAccessJwt(token:string): Promise <any>
    verifyJwt(token:string): Promise <Object|void>
    verifyRefreshJwt(token:string): Promise <payload|void>
}