import { ISubcription } from "../../../entities/subscription";

export interface IAdminEditSubscriptions{
    execute(input: {
       subscriptionId: string;
       price: number;
     }): Promise<void | ISubcription>
}