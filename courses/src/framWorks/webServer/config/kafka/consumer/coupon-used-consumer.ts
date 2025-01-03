
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { CouponUsedEvent } from "../events/coupon-used-event";
import { couponModel } from "../../../../db/mongodb/models/couponsModel";


export class CouponUsedConsumer extends KafkaConsumer<CouponUsedEvent>{
    topic: Topics.couponUsed = Topics.couponUsed;
    groupId: string = "course-coupon-used-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

    async  onMessage(data: { couponId: string; userId: string; }): Promise<void> {
        try {
            const {couponId,userId} = data
             const dt = await couponModel.findOneAndUpdate(
                { _id: couponId }, 
                { $addToSet:{users:userId} },
                { new: true } 
              ) 
               
        } catch (error) {
            console.error(error)
        }
    }
}