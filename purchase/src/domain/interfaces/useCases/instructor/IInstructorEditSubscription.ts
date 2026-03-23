import { IUserSubcription } from "../../../entities/userSubscription";

export interface IInstructorEditSubscription{
    execute(input: {
        subscriptionId: string;
        price: number;
        plan: string;
        instructorId: string;
      }): Promise<IUserSubcription | void>
}