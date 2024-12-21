import { Topics } from "../topics/topics";

export interface InstructorAprovedEvent {
    topic: Topics.instructorAproved;
    data: {
        _id: string;
        isInstructor:boolean
    };
}