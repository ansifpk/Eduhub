import { IRating } from "../../entities/ratings";

export interface IDeleteRating{
   execute(input: {
       ratingId: string;
     }): Promise<IRating | void> 
}