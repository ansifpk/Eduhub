import { IRating } from "../../../entities/ratings";

export interface IRatings {
   execute(input: {
       userId: string;
     }): Promise<IRating[] | void>
}