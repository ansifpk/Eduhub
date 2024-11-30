
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { UserModel } from "../../../../db/mongodb/models/userModel";
import { OrderCreateEvent } from "../events/order-created-event";
import { Course } from "../../../../db/mongodb/models/courseModel";


export class OrderCreatedCreateConsumer extends KafkaConsumer<OrderCreateEvent>{
    
    topic: Topics.orderCreated = Topics.orderCreated;
    groupId: string = "course-order-created-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

    async onMessage(data: { _id: string; userId: string; }): Promise<void> {
        try {
             const dt = await Course.findOneAndUpdate(
                { _id: data._id }, 
                { $push:{students:data.userId} },
                { new: true } 
              ) 
        } catch (error) {
            
        }
    }

    
}