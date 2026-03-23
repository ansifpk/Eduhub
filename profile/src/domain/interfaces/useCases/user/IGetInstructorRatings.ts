import { IRating } from "../../../entities/ratings";

export interface IGetInstructorRatings {
   execute(input: {
       instructorId: string;
     }): Promise<void | IRating[]>
}