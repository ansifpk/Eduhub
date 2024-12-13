
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { courseModel } from "../../../../db/mongoDB/models/courseMode";
import { CourseListedEvent } from "../events/course-listed-event";




export class CourseListedConsumer extends KafkaConsumer<CourseListedEvent>{
    
    
    topic: Topics.courseListed = Topics.courseListed;
    groupId: string = "purchase-course-listed-group";
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