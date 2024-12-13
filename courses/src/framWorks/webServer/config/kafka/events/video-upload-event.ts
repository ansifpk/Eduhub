import { Topics } from "../topics/topics";



export interface CourseCreateEvent {
    topic: Topics.videosUploaded;
    data: {
        _id: string;
        title: string;
        category:string;
        subCategory:string;
        level:string;
        thumbnail:string;
        description:string;
        subscription:boolean;
        price: number;
        isListed:boolean;
        instructorId:string;
        createdAt:string;
        image:{
            _id:string,
            image_url:string
        };
        sections:string
    }
}