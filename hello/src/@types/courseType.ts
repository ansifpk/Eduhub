import type { IRating } from "./ratingType"
import type { ISection } from "./sectionType"
import type { ITest } from "./testType"
import type { IUser } from "./userType"

export interface ICourse{
    _id:string,
    title:string,
    instructorId:IUser,
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
    }[],
    subscription:boolean,
    image:{
        _id:string,
        image_url:string
    },
    courseReviews:IRating[],
    students:IUser[],
    createdAt:string,
    sections:ISection,
}
