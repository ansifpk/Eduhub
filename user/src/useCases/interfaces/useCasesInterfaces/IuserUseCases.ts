import { NextFunction } from "express";
import { Iuser } from "../../../entities/user";

export interface IUserUseCase{
    userProfile(userId:string,next:NextFunction):Promise<Iuser|void>
    createProfile(userData:Iuser,next:NextFunction):Promise<Iuser|void>
   
}
