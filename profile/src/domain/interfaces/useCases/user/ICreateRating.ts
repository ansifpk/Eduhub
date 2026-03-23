import { IRating } from "../../../entities/ratings";

export interface ICreateRating {
   execute(input: {
       instructorId: string;
       userId: string;
       review: string;
       stars: number;
     }): Promise<void | IRating>
}