
import { Consumer } from "kafkajs";
import { courseModel } from "../../../../db/mongoDB/models/courseMode";
import { KafkaConsumer, Topics ,CourseCreateEvent} from "@eduhublearning/common";

export class CourseCreatedConsumer extends KafkaConsumer<CourseCreateEvent>{
    
    topic: Topics.courseCreated = Topics.courseCreated;
    groupId: string = "purchase-course-created-group";
    constructor(consumer:Consumer){
        super(consumer)
    }
    
    async onMessage(data: { _id: string; title: string; price: number; isListed: boolean; thumbnail: string; description: string; instructorId: string; category: string; subCategory: string; level: string; image: { _id: string; image_url: string; }; createdAt: string; subscription: boolean; }): Promise<void> {
        try {
            // Adding userDta to db in course Service
            await courseModel.create(data)
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
}