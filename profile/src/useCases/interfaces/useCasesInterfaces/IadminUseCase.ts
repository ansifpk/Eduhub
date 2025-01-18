import { NextFunction } from "express";
import { Iuser } from "../../../entities/user";

export interface IAdminUseCase{
    fetchInstructors(search:string,sort:string,page:number,next:NextFunction):Promise<{instructors:Iuser[],pages:number}|void>
    fetchStudents(search:string,sort:string,page:number,next:NextFunction):Promise<{students:Iuser[],pages:number}|void>
    instructorAprovel(email:string,status:string,next:NextFunction):Promise<Iuser|void>
    top5Instructors():Promise<Iuser[]|void>
}