import { ICoupon } from "../../../entities/coupon"
import { ICourse } from "../../../entities/course"
import { IReport } from "../../../entities/report"


export interface IAdminRepository{
    find(search:string,sort:string):Promise<ICourse[]|void>
    
    list(courseId:string):Promise<ICourse|void>
    findTop5():Promise<ICourse[]|void>
    // coupon
     createCoupon(title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string):Promise<ICoupon|void>
     findCouponById(couponId:string):Promise<ICoupon|void>
     deleteCoupon(couponId:string):Promise<ICoupon|void>
     editCoupon(couponId:string,title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string):Promise<ICoupon|void>
     coupons():Promise<ICoupon[]|void>
     findReports(): Promise<IReport[] | void>

    }