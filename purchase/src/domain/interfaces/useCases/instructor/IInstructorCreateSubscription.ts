import { IUserSubcription } from "../../../entities/userSubscription";

export interface IInstructorCreateSubscription{
   execute(input: {
       userId: string;
       plan: string;
       price: number;
       description: string[];
     }): Promise<IUserSubcription | void> 
}