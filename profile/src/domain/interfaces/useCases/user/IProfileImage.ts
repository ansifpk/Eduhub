import { Iuser } from "../../../entities/user";

export interface IProfileImage {
   execute(input: {
       userId: string;
       image: {
         profileImage?: Express.Multer.File[];
       };
     }): Promise<void | Iuser> 
}