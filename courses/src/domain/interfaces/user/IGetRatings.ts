import { IRating } from "../../entities/ratings";

export interface IGetRatings{
   execute(input: {
       courseId: string;
     }): Promise<void | IRating[]>
}