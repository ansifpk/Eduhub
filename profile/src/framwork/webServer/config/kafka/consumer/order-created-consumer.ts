
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { OrderCreateEvent } from "../events/order-created-event";
import { cartModel } from "../../../../db/mongoDB/models/cart";



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