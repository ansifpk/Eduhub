import { Publisher } from "../base-publisher";
import { CourseUpdatedEvent } from "../events/course-updated-event";
import { Topics } from "../topics/topics";

export class CourseUpdatedPublisher extends Publisher<CourseUpdatedEvent>{
    topic: Topics.courseUpdated = Topics.courseUpdated;
}