import { IHashPassword } from "../../useCase/interface/serviceInterface/IHashPassword";
import bcrypt from 'bcryptjs';

export class Encrypt implements IHashPassword{
    async createHash(password: string): Promise<string> {
       const hashedPassword = await bcrypt.hash(password,10)
       return hashedPassword;
    }
    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        const comparedPassword = await bcrypt.compare(password,hashPassword)
        return comparedPassword;
    }
   
}