import { Topics } from "../topics/topics";



export interface CourseCreateEvent {
    topic: Topics.courseCreated;
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
        sessions: Array<{
            sessionTitle: string,
            lectures: Array<{
                _id: string,
                content: {
                    _id: string,
                    video_url: string,
                },
                duration: string,
                title: string,
            }>
        }>
    }
}