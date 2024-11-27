
export interface Course{
    _id?:string,
    title:string,
    instructorId?:string,
    subCategory:string,
    description:string,
    thumbnail:string,
    category:string,
    level:string,
    isListed:boolean,
    price:number,
    test?:[];
    subscription:boolean,
    image:string,
    imageUrl?:string,
    students?:string[],
    createdAt:string,
    sessions:[{
        sessionTitle:string,
        lectures:[{
            lectureTitle:string,
            videos:File[]
        }]
    }]
}

export interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }

export interface CLoudineryResult {
    public_id: string;
    secure_url: string;
  }