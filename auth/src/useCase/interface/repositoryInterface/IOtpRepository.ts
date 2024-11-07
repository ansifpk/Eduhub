
import { Iotp } from "../../../entities/otp"; 

export interface IOtpRepository{
    createOtp(email:string,otp:string):Promise<Iotp>
    findOtp(email:string):Promise<Iotp| null>
    deleteOtp(email:string):Promise<boolean>
}