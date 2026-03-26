import { INotification } from "../entities/notifications";

export interface IGetNotification {
    execute(input: {
    recipientId: string;
  }): Promise<INotification[] | void>
}