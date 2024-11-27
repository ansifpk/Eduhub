
interface IParams{
   Bucket?:string;
   Key?:string
   Body?:Buffer
   ContentType?:string
}

export interface IS3bucket{
    putGallery(params:IParams):Promise<boolean>
    getGallery(objectParams:IParams):Promise<string|void>
    checkGallery(objectParams:IParams):Promise<boolean|void>
    deleteGallery():Promise<boolean>
}