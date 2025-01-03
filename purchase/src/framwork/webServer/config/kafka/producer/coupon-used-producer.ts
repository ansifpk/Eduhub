
import { Publisher } from "../base-publisher";
import { CouponUsedEvent } from "../events/coupon-used-event";
import { Topics } from "../topics/topics";


export class CouponUsedPublisher extends Publisher<CouponUsedEvent>{
    topic: Topics.couponUsed = Topics.couponUsed;
}