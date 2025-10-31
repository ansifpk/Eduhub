import bcrypt from 'bcryptjs';
import { IHashPassword } from '../../domain/interfaces/serviceInterfaces/IHashPassword';

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