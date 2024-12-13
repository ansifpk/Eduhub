import { ICourse } from "../../../entities/course";
import { Query } from "../../../framWorks/webServer/types/type";
interface Course{
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
    videos:string[],
    image:string,
    imageUrl?:string,
    videoUrl?:string[],
    createdAt:string,
}
export interface IUserRepository{
    find(query:Query):Promise<ICourse[]|void>
    findWithCondition(userId:string):Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>
}