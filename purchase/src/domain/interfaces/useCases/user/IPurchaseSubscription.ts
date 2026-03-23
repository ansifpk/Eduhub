import { IUserSubscribe } from "../../../entities/userSubscribe";

export interface IPurchaseSubscription{
   execute(input: {
    userId: string;
    subscriptionId: string;
  }): Promise<string | void>
}