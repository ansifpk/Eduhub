import { ISection } from "./section";

export interface ICourse{
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
    sections:string,
}

