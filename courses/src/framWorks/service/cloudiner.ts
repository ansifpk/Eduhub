import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';
import { ICloudinary } from '../../useCases/interfaces/service/Icloudinery';
import { CLoudineryResult, MulterFile } from '../webServer/types/type';
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
        //  const buffor = await sharp(file.buffer).resize({width:1920,height:1080,fit:"inside"}).toBuffer()
        //  if(buffor){
            const data =  await this.cloudinaryClient.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`,{
                folder:"courses",
                resource_type: file.mimetype.startsWith("video/")?"video":"auto"
           })
            if(data){
                return {public_id:data.public_id,secure_url:data.secure_url}
            }
        //  }
        
         
     } catch (error) {
        console.error(error)
     }
     
    }
    async deleteFile(): Promise<boolean|void> {
        try {
            throw new Error('Method not implemented.');
        } catch (error) {
            console.error(error)
        }
        
    }
}

export default CloudinaryV2
