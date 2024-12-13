import { Topics } from "../topics/topics";

export interface CourseCreateEvent {
    topic: Topics.courseCreated;
    data: {
                _id: string,
                title: string,
                price: string,
                isListed: boolean,
                thumbnail: string,
                description: string,
                instructorId: string,
                category: string,
                subCategory: string,
                level: string,
                image: {
                    _id:string,
                    image_url:string
                },
                createdAt: Date,
                subscription: boolean
    };
}