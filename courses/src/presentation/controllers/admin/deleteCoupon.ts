import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IDeleteCoupon } from "../../../domain/interfaces/admin/IDeleteCoupon";

export class DeleteCouponController implements IController {
    constructor(private readonly _useCase:IDeleteCoupon) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const {couponId} = req.params;
             const coupon = await this._useCase.execute({_id:couponId})
             if(coupon){
                res.status(StatusCodes.OK).send({success:true,coupon:coupon})
             }
            } catch (error) {
                next(error);
            }
    }
}