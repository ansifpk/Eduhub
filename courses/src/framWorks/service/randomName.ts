import crypto  from "crypto";
import { IRandomName } from "../../useCases/interfaces/service/IrandomName";



export class Encrypt implements IRandomName{
    createName(): Promise<string> {
        const cerateRandomName = async (bcryp=32)=>crypto.randomBytes(bcryp).toString("hex") 
        return Promise.resolve(cerateRandomName());
    }
    
}