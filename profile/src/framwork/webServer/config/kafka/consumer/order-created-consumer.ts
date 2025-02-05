
import { Consumer } from "kafkajs";
import { cartModel } from "../../../../db/mongoDB/models/cart";
import { Topics,KafkaConsumer,CourseCreateEvent, OrderCreateEvent } from "@eduhublearning/common";


export class OrderCreatedCreateConsumer extends KafkaConsumer<OrderCreateEvent>{
    
    topic: Topics.orderCreated = Topics.orderCreated;
    groupId: string = "profile-order-created-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

    async onMessage(data: { _id: string; userId: string; }): Promise<void> {
        try {
             await cartModel.deleteMany({userId:data.userId})
               
        } catch (error) {
            
        }
    }

    
}