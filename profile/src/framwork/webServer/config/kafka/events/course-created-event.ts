import { Topics } from "../topics/topics";

export interface CourseCreateEvent {
    topic: Topics.courseCreated;
    data: {
                _id: string,
                title: string,
                price: string,
                isListed: boolean,
                instructorId: string,
                category: string,
                subCategory: string,
                level: string,
                image: {
                    _id:string,
                    image_url:string
                },
                subscription: boolean
    };
}