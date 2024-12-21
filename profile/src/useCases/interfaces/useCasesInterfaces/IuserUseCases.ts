import { NextFunction } from "express";
import { Iuser } from "../../../entities/user";
import { ICourse } from "../../../entities/course";
import { ICart } from "../../../entities/cart";
import { IRating } from "../../../entities/ratings";

export interface IUserUseCase{
    userProfile(userId:string,next:NextFunction):Promise<Iuser|void>
    createProfile(userData:Iuser,next:NextFunction):Promise<Iuser|void>
    addToCart(courseId:string,userId:string,next:NextFunction):Promise<ICart|void>
    removeFromCart(courseId:string,userId:string,next:NextFunction):Promise<ICart|void>
    Cart(userId:string,next:NextFunction):Promise<ICart|void>

    createRating(instructorId:string,userId:string,review:string,stars:number,next:NextFunction):Promise<IRating|void>
    getRating(instructorId:string,next:NextFunction):Promise<IRating[]|void>
    editRating(ratingId:string,review:string,stars:number,next:NextFunction):Promise<IRating|void>
    deleteRating(ratingId:string,next:NextFunction):Promise<IRating|void>
}
