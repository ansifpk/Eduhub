import { NextFunction } from "express";
import { Iuser } from "../../../entities/user";
// import { Req } from "../../../framwork/webServer/types/type";
interface FileData {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }
  interface Req {
    bodyData:object,
    fileData:{ 
     certificateImage?: Express.Multer.File[], 
     cvImage?: Express.Multer.File[] 
   }
   }
export interface IInstructorUseCase{
    register(userData:Req,next:NextFunction):Promise<Iuser|void>
}