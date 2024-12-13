
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
// import { CourseCreateEvent } from "../events/course-updated-event";
import { courseModel } from "../../../../db/mongoDB/models/courseMode";
import { CourseCreateEvent } from "../events/course-created-event";



export class CourseCreatedConsumer extends KafkaConsumer<CourseCreateEvent>{
    
    topic: Topics.courseCreated = Topics.courseCreated;
    groupId: string = "purchase-course-created-group";
    constructor(consumer:Consumer){
        super(consumer)
    }
    
    async onMessage(data: { _id: string; title: string; price: string; isListed: boolean; thumbnail: string; description: string; instructorId: string; category: string; subCategory: string; level: string; image: { _id: string; image_url: string; }; createdAt: Date; subscription: boolean; }): Promise<void> {
        try {
            console.log('Consumer received message course :', data);
            // Adding userDta to db in course Service
            await courseModel.create(data)
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
}