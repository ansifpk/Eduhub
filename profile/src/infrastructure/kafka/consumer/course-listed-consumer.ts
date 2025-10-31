
import { Consumer } from "kafkajs";
import { courseModel } from "../../db/models/courseModel";
import { Topics,KafkaConsumer,CourseListedEvent } from "@eduhublearning/common";



export class CourseListedConsumer extends KafkaConsumer<CourseListedEvent>{
    
    
    topic: Topics.courseListed = Topics.courseListed;
    groupId: string = "profile-course-listed-group";
    constructor(consumer:Consumer){
        super(consumer)
    }
   async  onMessage(data: { _id: string; isListed: boolean; }): Promise<void> {
       try {
          const {_id,isListed} = data
          await courseModel.findByIdAndUpdate({_id:_id},{isListed:isListed},{new:true})
       } catch (error) {
        console.error(error)
       }
    }
    
}