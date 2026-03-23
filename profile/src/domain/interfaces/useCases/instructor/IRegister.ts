import { Iuser } from "../../../entities/user";

export interface IRegister {
    execute(input: {
        userData: Iuser;
        fileData: {
          certificateImage?: Express.Multer.File[];
          cvImage?: Express.Multer.File[];
        };
      }): Promise<Iuser | void>
}