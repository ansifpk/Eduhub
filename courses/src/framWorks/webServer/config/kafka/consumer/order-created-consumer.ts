
import { Consumer } from "kafkajs";
import { Topics,OrderCreateEvent,KafkaConsumer } from "@eduhublearning/common";
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
                { $addToSet:{students:data.userId} },
                { new: true } 
              ) 
               console.log("update",dt);
               
        } catch (error) {
            
        }
    }

    
}