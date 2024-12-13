import { Topics } from "../topics/topics";

export interface InstructorAprovedEvent {
    topic: Topics.instructorAproval;
    data: {
        _id: string;
        isInstructor:boolean
    };
}