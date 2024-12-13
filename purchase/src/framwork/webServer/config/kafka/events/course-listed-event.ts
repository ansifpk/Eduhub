import { Topics } from "../topics/topics";



export interface CourseListedEvent {
    topic: Topics.courseListed;
    data: {
        _id: string;
       isListed:boolean
    }
}