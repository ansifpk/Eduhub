import { NextFunction } from "express";
import { IAdmin } from "../../../entities/admin";
import { IToken } from "../serviceInterface/IJwt";
import { Iuser } from "../../../entities/user";

export interface IadminUsecase{
    adminLogin(email:string,password:string,next:NextFunction):Promise<{admin:IAdmin,token:IToken}|void>
    fetchStudents():Promise<Iuser[]|void>
    fetchInstructors():Promise<Iuser[]|void>
    blockUser(userId:string,next:NextFunction):Promise<Iuser|void>
    editProfile(instructorId:string,name:string,email:string,next:NextFunction):Promise<Iuser|void>
    checkTockens(tocken:string,next:NextFunction):Promise <IToken|void>
}
