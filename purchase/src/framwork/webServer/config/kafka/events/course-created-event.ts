import { Topics } from "../topics/topics";

export interface CourseCreateEvent {
    topic: Topics.courseCreated;
    data: {
        _id: string;
        title: string;
        category: string;
        subCategory: string;
        level:string;
        thumbnail:string;
        description:string;
        price:string;
    };
}