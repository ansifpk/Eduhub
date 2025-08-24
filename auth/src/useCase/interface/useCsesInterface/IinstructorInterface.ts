
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
    instructorLogin(email:string,password:string,next:NextFunction):Promise <{instructor:Iuser,token:IToken}|void>
    fetchStudents():Promise <Iuser[]|void>
    checkTockens(tocken:string,next:NextFunction):Promise <IToken|void>
}