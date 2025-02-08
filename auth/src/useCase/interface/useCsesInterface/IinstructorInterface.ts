
import { NextFunction } from "express";
import { IToken } from "../serviceInterface/IJwt";
import { Iuser } from "../../../entities/user";
export interface IInstructor{
    _id?:string;
    name:string;
    email:string;
    qualification:string;
    expirience:string;
    certificate:string;
    cv:string;
}
export interface IInstructorInterface{
    instructorRegister(email:string,name:string,qualification:string,expirience:string,certificate:string,cv:string,next:NextFunction):Promise <{user:Iuser,token:IToken}|void>
    editProfile(instructorId:string,email:string,name:string,next:NextFunction):Promise <Iuser|void>
    instructorLogin(email:string,password:string,next:NextFunction):Promise <{instructor:Iuser,token:IToken}|void>
    fetchStudents():Promise <Iuser[]|void>
    editProfile(instructorId:string,email:string,name:string,next:NextFunction):Promise <Iuser|void>
    checkTockens(tocken:string,next:NextFunction):Promise <IToken|void>
}