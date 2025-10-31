import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { DeleteCoupon } from "../../../application/admin/deleteCoupon";

export class DeleteCouponController implements IController {
    constructor(private readonly _useCase:DeleteCoupon) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const {couponId} = req.params;
             const coupon = await this._useCase.execute({_id:couponId,next})
             if(coupon){
                res.send({success:true,coupon:coupon})
             }
            } catch (error) {
                console.error(error)
            }
    }
}