import { Iotp } from "../../../../entities/otp";
import { IOtpRepository } from "../../../../useCase/interface/repositoryInterface/IOtpRepository";
import otpModel from "../models/otpModel";


export class OtpRepository implements IOtpRepository{
    async createOtp(email: string, otp: string): Promise<Iotp> {
        const createOtp = await otpModel.create({email:email,otp:otp})
        setTimeout(async ()=>{
            if(createOtp.id){
              await otpModel.findOneAndDelete({_id:createOtp.id})
            }
        },120000)
        return createOtp;

    }
    async deleteOtp(email: string): Promise<boolean> {
      
         const data = await otpModel.findOneAndDelete({email:email})
       
         if(data){
            return true;
         }else{
             return false;
         }
         
    }
    async findOtp(email: string): Promise<any | null> {
        const data = await otpModel.findOne({email:email})
        if(data){
          return data;
        }
        
    }
   
    
}