import { IUserSubcription } from "../../../entities/userSubscription";

export interface IGetSubscriptions{
    execute(input: {
    instructorId: string;
  }): Promise<void | IUserSubcription[]>
}