import { IOtpGenerator } from "../../useCase/interface/serviceInterface/IOtpagenerator";
export class OtpGenerator implements IOtpGenerator{
    async createOtp(): Promise<string> {
        console.log("create the otp")
        const numericChars = '0123456789'
        let otp =''
        for(let i=0;i<6;i++){
            const randomIndex = Math.floor(Math.random()* numericChars.length);
            otp += numericChars[randomIndex]
        }
        return otp
    }
}