import { Publisher } from "../base-publisher";
import { CourseListedEvent } from "../events/course-listed-event";
import { Topics } from "../topics/topics";

export class CourseListedPublisher extends Publisher<CourseListedEvent>{
    topic: Topics.courseListed = Topics.courseListed;
}