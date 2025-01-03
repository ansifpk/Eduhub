import { NextFunction } from "express";
import { Iuser } from "../../../entities/user";

export interface IAdminUseCase{
    fetchInstructors(search:string,sort:string,next:NextFunction):Promise<Iuser[]|void>
    fetchStudents(search:string,sort:string,next:NextFunction):Promise<Iuser[]|void>
    instructorAprovel(email:string,status:string,next:NextFunction):Promise<Iuser|void>
}