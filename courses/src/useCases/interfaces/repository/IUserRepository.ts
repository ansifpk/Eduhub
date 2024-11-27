import { ICourse } from "../../../entities/course";
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
    find():Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>
}