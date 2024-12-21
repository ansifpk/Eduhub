
import { Publisher } from "../base-publisher";
import { CourseCreateEvent } from "../events/course-created-event";
import { Topics } from "../topics/topics";


export class CourseCreatedPublisher extends Publisher<CourseCreateEvent>{
    topic: Topics.courseCreated = Topics.courseCreated;
}