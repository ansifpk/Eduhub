import { IUser } from "./chatUser"
import { ITest } from "./testType"

export interface ICourse{
    _id:string,
    title:string,
    instructorId:{
        _id:string,
        name:string,
        email:string,
        avatar:{
            id:string,
            avatart_url:string
        }
    },
    subCategory:string,
    description:string,
    thumbnail:string,
    category:string,
    level:string,
    isListed:boolean,
    price:number,
    test:{
        _id:string,
        test:ITest[],
        students:{
            user:string,
            score:number
        }[],
    },
    subscription:boolean,
    image:{
        _id:string,
        image_url:string
    },
    // students?:{
    //    _id:string,
    //    name:string,
    //    avatar:{
    //     avatar_url:string
    //    }
    //    email:string,
    //    createdAt:string
    // }[],
    students?:IUser[],
    createdAt:string,
    sections:{
        sectionTitle:string,
        lectures:[{
            id:string,
            content:{
                _id:string,
                video_url:string
            },
            duration:string,
            title:string,
        }]
    }[],
}
