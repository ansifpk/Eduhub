import { IUserSubscribe } from "../../../entities/userSubscribe";

export interface IPurchasedSubscriptions{
   execute(input: {
    userId: string;
  }): Promise<IUserSubscribe[] | void>
}