import { Topics } from "../topics/topics";

export interface CouponUsedEvent {
    topic: Topics.couponUsed;
    data: {
        couponId: string,
        userId: string,
    };
}