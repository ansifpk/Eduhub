import { ICoupon } from "../../../entities/coupon"
import { ICourse } from "../../../entities/course"


export interface IAdminRepository{
    find(search:string,sort:string):Promise<ICourse[]|void>
    create(courseData:ICourse):Promise<ICourse|void>
    list(courseId:string):Promise<ICourse|void>
    edit(courseData:ICourse):Promise<ICourse|void>
    // coupon
     createCoupon(title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string):Promise<ICoupon|void>
     findCouponById(couponId:string):Promise<ICoupon|void>
     deleteCoupon(couponId:string):Promise<ICoupon|void>
     editCoupon(couponId:string,title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string):Promise<ICoupon|void>
     coupons():Promise<ICoupon[]|void>

    }