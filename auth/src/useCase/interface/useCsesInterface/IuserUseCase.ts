import { NextFunction } from "express";
import { Iuser } from "../../../entities/user";
import { IToken } from "../serviceInterface/IJwt";

export interface IuserUseCase{
    userSignUp(user:Iuser,next:NextFunction):Promise <string|void>
    insertUser(token:string,otp:string,next: NextFunction):Promise <Iuser| void>
    login(email:string,password:string,next:NextFunction):Promise <{user:Iuser,token:IToken}|void>
    googleLogin(email:string,name:string,password:string,next:NextFunction):Promise <{user:Iuser,token:IToken}|void>
    sentOtp(email:string,next:NextFunction):Promise <boolean|void>
    verifyEmail(email:string,next:NextFunction):Promise <any|void>
    verifyOtp(email:string,otp:string,next:NextFunction):Promise <any|void>
    changePassword(email:string,password:string,next:NextFunction):Promise <any|void>
    editUser(userId:string,name:string,email:string,next:NextFunction):Promise <Iuser|void>
}
