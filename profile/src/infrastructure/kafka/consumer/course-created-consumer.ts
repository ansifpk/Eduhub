
import { Consumer } from "kafkajs";
import { Topics,KafkaConsumer,CourseCreateEvent } from "@eduhublearning/common";
import { courseModel } from "../../db/models/courseModel";



export class CourseCreatedConsumer extends KafkaConsumer<CourseCreateEvent>{
  
    topic: Topics.courseCreated = Topics.courseCreated;
    groupId: string = "profile-course-created-group";
    constructor(consumer:Consumer){
        super(consumer)
    }
    
    async  onMessage(data: { _id: string; title: string; price: number; isListed: boolean; instructorId: string; category: string; subCategory: string; level: string; image: { _id: string; image_url: string; }; subscription: boolean; }): Promise<void> {
        try {
            // Adding userDta to db in course Service
            await courseModel.create(data)
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
}