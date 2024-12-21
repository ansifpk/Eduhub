import { ICourse } from "../../../entities/course";
import { IRating } from "../../../entities/ratings";
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
    courses(instructorId:string):Promise<ICourse[]|void>
    findWithCondition(userId:string):Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>

     //Rating
    ratings(courseId:string):Promise<IRating[]|void>
    createRating(courseId:string,userId:string,review:string,stars:number):Promise<IRating|void>
    editRating(ratingId:string,review:string,stars:number):Promise<IRating|void>
    findRating(ratingId:string):Promise<IRating|void>
    checkRating(courseId:string,userId:string):Promise<IRating|void>
    deleteRating(ratingId:string):Promise<IRating|void>

   
}