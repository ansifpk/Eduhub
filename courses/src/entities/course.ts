import { ISection } from "./section";
import { Iuser } from "./user";

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
    test?:string;
    subscription:boolean,
    image:{
        _id:string,
        image_url:string
    },
    students?:Iuser[],
    createdAt:string,
    sections:string[],
}

