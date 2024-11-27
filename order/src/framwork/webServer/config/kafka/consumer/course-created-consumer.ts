
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { CourseCreateEvent } from "../events/course-created-event";
import { courseModel } from "../../../../db/mongoDB/models/courseMode";



export class CourseCreatedConsumer extends KafkaConsumer<CourseCreateEvent>{
    topic: Topics.courseCreated = Topics.courseCreated;
    groupId: string = "order-course-created-group";
    constructor(consumer:Consumer){
        super(consumer)
    }
    async onMessage(data: { _id: string; title: string; category: string; subCategory: string; level: string; thumbnail: string; description: string; price: string; }): Promise<void> {
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