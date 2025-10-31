
import { Consumer } from "kafkajs";
import { Topics,CouponUsedEvent ,KafkaConsumer} from "@eduhublearning/common";
import { couponModel } from "../../db/models/couponsModel";


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