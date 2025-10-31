import { S3Client,PutObjectCommand,HeadObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';
import { IS3bucket } from "../../domain/interfaces/service/Is3bucket";
dotenv.config();
if(!process.env.BUCKET_ACCESS_KEY){
    throw new Error("hi")
}
if(!process.env.BUCKET_REGION){
    throw new Error("hi")
}
if(!process.env.BUCKET_SECRET_KEY){
    throw new Error("hi")
}
if(!process.env.BUCKET_NAME){
    throw new Error("hi")
}

interface IParams{
   Bucket?:string;
   Key?:string
   Body?:Buffer
   ContentType?:string
}
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.BUCKET_SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;

export class S3bucket implements IS3bucket{
    private s3Client:S3Client;
    constructor(){
        this.s3Client = new S3Client({
            credentials: {
                accessKeyId:accessKey,
                secretAccessKey:secretAccessKey,
              },
              region:bucketRegion, 
        })
    }
    async putGallery(params: IParams): Promise<boolean> {

        const command = new PutObjectCommand({
          Bucket:bucketName,
          Key:params.Key,
          Body:params.Body,
          ContentType:params.ContentType
        })
        await this.s3Client.send(command);
        return true;
       
    }
    async checkGallery(objectParams:IParams):Promise<boolean|void>{
try {
    const command = new HeadObjectCommand({
        Bucket:bucketName,
        Key:objectParams.Key
    });
    const response = await this.s3Client.send(command);
    // console.log("check",response);
    
    if(response.$metadata.httpStatusCode==200){
        return true;
    }else{
        return false
    }
} catch (error:any) {
    if(error.$metadata.httpStatusCode==403){
       return false; 
    }
    console.error(error);
    
}

    }

    async getGallery(objectParams:IParams): Promise<string|void> {
        const command = new GetObjectCommand({
            Bucket:bucketName,
            Key:objectParams.Key
          })
        const url = await getSignedUrl(this.s3Client,command,{expiresIn:518400})
        if(url){
            return url
        }
    }
    deleteGallery(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}