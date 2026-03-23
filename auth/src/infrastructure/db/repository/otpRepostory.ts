import { Iotp } from "../../../domain/entities/otp";
import { IOtpRepository } from "../../../domain/interfaces/IOtpRepository";
import otpModel from "../models/otpModel";


export class OtpRepository implements IOtpRepository{
    
    constructor(
        private otpModels:typeof otpModel,
    ){}

    async createOtp(email: string, otp: string): Promise<Iotp> {
        const createOtp = await this.otpModels.create({email:email,otp:otp});
        return createOtp;

    }
    async deleteOtp(email: string): Promise<boolean> {
      
         const data = await this.otpModels.findOneAndDelete({email:email})
       
         if(data){
            return true;
         }else{
             return false;
         }
         
    }
    async findOtp(email: string): Promise<any | null> {
        const data = await this.otpModels.findOne({email:email})
        if(data){
          return data;
        }
        
    }
   
    
}