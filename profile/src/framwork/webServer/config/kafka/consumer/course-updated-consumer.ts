
import { Consumer } from "kafkajs";
import { courseModel } from "../../../../db/mongoDB/models/courseModel";
import { Topics,KafkaConsumer,CourseUpdatedEvent } from "@eduhublearning/common";


export class CourseUpdatedConsumer extends KafkaConsumer<CourseUpdatedEvent>{
    
    topic: Topics.courseUpdated = Topics.courseUpdated;
    groupId: string = "purchase-course-updated-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

async  onMessage(data: { _id: string; title: string; category: string; subCategory: string; level: string; price: number; image: { _id: string; image_url: string; }; }): Promise<void> {
  
    try {
        await courseModel.findByIdAndUpdate({_id:data._id},{$set:{title:data.title,category:data.category,subCategory:data.subCategory,level:data.level,price:data.price, image: data.image}},{new:true})
   } catch (error) {
    console.error(error)
   }

}

}