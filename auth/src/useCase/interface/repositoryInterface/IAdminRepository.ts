import { NextFunction } from "express";
import { IAdmin } from "../../../entities/admin";
import { Iuser } from "../../../entities/user";

export interface IAdminRepository{
    find():Promise<Iuser[]|void>
    findById(userId:string):Promise<Iuser|void>
    findByEmail(email:string):Promise<IAdmin|void>
    block(student:Iuser):Promise<Iuser|void>
    update(adminId:string,name:string,email:string):Promise<Iuser|void>
    create(userData:Iuser):Promise<Iuser|void>
}