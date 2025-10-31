import { ICoupon } from "../../entities/coupon"
import { ICourse } from "../../entities/course"
import { IRating } from "../../entities/ratings"
import { IReport } from "../../entities/report"
import { ITest } from "../../entities/test"
import { IQuery } from "../IQuery"


export interface IUserRepository{
    find(query:IQuery):Promise<ICourse[]|void>
    getPages(search:string,
        category:string,
        level:string,
        topic:string,
        sort:string):Promise<number|void>
    courses(instructorId:string):Promise<ICourse[]|void>
    findWithCondition(userId:string):Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>
    createReport(userId:string,report:string,content:string,courseId:string):Promise<IReport|void>
    findReports(userId:string,courseId:string):Promise<IReport[]|void>
    checkReport(userId:string,content:string,courseId:string):Promise<IReport|void>
     //Rating
    ratings(courseId:string):Promise<IRating[]|void>
    createRating(courseId:string,userId:string,review:string,stars:number):Promise<IRating|void>
    editRating(ratingId:string,review:string,stars:number):Promise<IRating|void>
    findRating(ratingId:string):Promise<IRating|void>
    checkRating(courseId:string,userId:string):Promise<IRating|void>
    deleteRating(ratingId:string):Promise<IRating|void>

    //coupons
    Coupons():Promise<ICoupon[]|void>
    findCoupon(couponId:string):Promise<ICoupon|void>
    findByCouponCode(couponCode:string):Promise<ICoupon|void>
    useCoupon(couponId:string,userId:string):Promise<ICoupon|void>

    //test
    findTest(testId:string):Promise<ITest|void>
    submitTest(userId:string,testId:string,mark:number):Promise<ITest|void>
    

   
}