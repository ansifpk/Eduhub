import { CLoudineryResult } from "../ICloudineryResult";
import { MulterFile } from "../IMulterFile";


export interface ICloudinary{
    addFile(file:MulterFile):Promise<CLoudineryResult|void>;
    updateFile(file:MulterFile,publicId:string):Promise<CLoudineryResult|void>
}