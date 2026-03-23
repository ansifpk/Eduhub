import { IRating } from "../../entities/ratings";

export interface ICreateRating{
   execute(input: {
       courseId: string;
       userId: string;
       review: string;
       stars: number;
     }): Promise<IRating | void> 
}