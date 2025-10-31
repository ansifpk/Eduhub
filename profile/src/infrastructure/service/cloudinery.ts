import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';
import { ICloudinary } from '../../domain/interfaces/serviceInterfaces/ICloudinery';
import { MulterFile } from '../../domain/interfaces/IMulterFile';
import { CLoudineryResult } from '../../domain/interfaces/ICloudineryResult';
dotenv.config();




class CloudinaryV2 implements ICloudinary{

    cloudinaryClient: typeof cloudinary;
    
    constructor(){

        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.CLOUD_KEY,
            api_secret:process.env.CLOUD_SECRET
        });
        this.cloudinaryClient = cloudinary;
    }

    async addFile(file:MulterFile): Promise<CLoudineryResult|void> {
     try {
        const data =  await this.cloudinaryClient.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`,{
             folder:"courses",
             resource_type: "auto"
        })
         if(data){
             return {public_id:data.public_id,secure_url:data.secure_url}
         }
         
     } catch (error) {
        console.error(error)
     }
     
    }
    async updateFile(file: MulterFile, publicId: string): Promise<CLoudineryResult | void> {
        try {
          
          const data = await this.cloudinaryClient.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
            {
              folder: "courses",
              resource_type: "auto",
            }
          );
      
          if (data) {
            await this.cloudinaryClient.uploader.destroy(publicId);
            return data;
          }
        } catch (error) {
          console.error("Error updating file:", error);
        }
      }
}

export default CloudinaryV2
