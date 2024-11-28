import { CLoudineryResult, MulterFile } from "../../../framwork/webServer/types/type";


export interface ICloudinary{
    addFile(file:MulterFile):Promise<CLoudineryResult|void>;
    deleteFile():Promise<boolean|void>
}