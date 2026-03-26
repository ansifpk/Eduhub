import { IRating } from "../../entities/ratings";

export interface ITopRatings {
    execute(input: {
        userId: string;
      }): Promise<IRating[] | void>
}