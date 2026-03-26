import { IRating } from "../../entities/ratings";

export interface IUpdateRating{
   execute(input: {
       _id: string;
       review: string;
       stars: number;
     }): Promise<IRating | void> 
}