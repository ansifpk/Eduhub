import { CLoudineryResult } from "../ICloudineryResult"
import { MulterFile } from "../IMulterFile"



export interface ICloudinary{
    addFile(file:MulterFile):Promise<CLoudineryResult|void>
    deleteFile():Promise<boolean|void>
}