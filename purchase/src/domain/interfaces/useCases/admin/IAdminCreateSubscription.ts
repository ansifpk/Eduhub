import { ISubcription } from "../../../entities/subscription";

export interface IAdminCreateSubscriptions{
   execute(input: {
       price: number;
       plan: string;
       description: string[];
     }): Promise<ISubcription | void>
}