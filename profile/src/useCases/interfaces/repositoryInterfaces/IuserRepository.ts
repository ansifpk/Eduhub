import { ICourse } from "../../../entities/course";
import { Iuser } from "../../../entities/user";
import { ICart } from "../../../entities/cart";
import { IRating } from "../../../entities/ratings";

export interface IUserRepository{
    //user
    findById(userId:string):Promise<Iuser|void>
    findByIdAndUpdate(userId:string,name:string,thumbnail:string,aboutMe:string,):Promise<Iuser|void>
    uploadProfile(userId:string,avatar:{id:string,avatar_url:string}):Promise<Iuser|void>
     //course
     findCourse(courseId:string):Promise<ICourse|void>
    
     //cart
     findCart(userId:string):Promise<ICart|void>
     createCart(cartData:{userId:string,courseId:string}):Promise<ICart|void>
     addToCart(userId:string,courseId:string):Promise<ICart|void>
     removeFromCart(userId:string,courseId:string):Promise<ICart|void>

     //rating
     createRating(instructorId:string,userId:string,review:string,stars:number):Promise<IRating|void>
     findAllrating(instructorId:string):Promise<IRating[]|void>
     findRatinById(ratingId:string):Promise<IRating|void>
     editRatinById(ratingId:string,review:string,stars:number):Promise<IRating|void>
     deleteRatinById(ratingId:string):Promise<IRating|void>
     checkingRating(instructorId:string,userId:string):Promise<IRating|void>
}