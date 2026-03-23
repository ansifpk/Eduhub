import { IRating } from "../../../entities/ratings";

export interface IEditRating {
    execute(input: {
        ratingId: string;
        review: string;
        stars: number;
      }): Promise<void | IRating> 
}