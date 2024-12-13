
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { courseModel } from "../../../../db/mongoDB/models/courseMode";
import { CourseUpdatedEvent } from "../events/course-updated-event";



export class CourseUpdatedConsumer extends KafkaConsumer<CourseUpdatedEvent>{
   
    
    topic: Topics.courseUpdated = Topics.courseUpdated;
    groupId: string = "purchase-course-updated-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

async onMessage(data: { _id: string; title: string; category: string; subCategory: string; level: string; thumbnail: string; description: string; price: number; sections: string[]; image: { _id: string; image_url: string; }; }): Promise<void> {
  
    try {
        await courseModel.findByIdAndUpdate({_id:data._id},{$set:{title:data.title,category:data.category,subCategory:data.subCategory,level:data.level,thumbnail:data.thumbnail,description:data.description, sections:data.sections,price:data.price, image: data.image}},{new:true})
   } catch (error) {
    console.error(error)
   }
}

}