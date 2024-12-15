import { Topics } from "../topics/topics";



export interface CourseUpdatedEvent {
    topic: Topics.courseUpdated;
    data: {
        _id: string;
        title: string;
        category:string;
        subCategory:string;
        level:string;
        price: number;
        image:{
            _id:string,
            image_url:string
        };
    }
}