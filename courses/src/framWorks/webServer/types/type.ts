
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
    image:{
        _id:string,
        image_url:string
    },
    students?:string[],
    createdAt:string,
    sections:[{
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
    [x: string]: any;
    public_id: string;
    secure_url: string;
  }
export interface Query {
    page: number ;
    search: string;
    category: string;
    level: string;
    topic: string;
    sort: string;
  }

export interface Section{
        _id?:string,
        sectionsTitle:string,
        lectures:[{
            _id:string,
            content:{
                _id:string,
                video_url:string,
            },
            duration:string,
            title:string,
        }]
}