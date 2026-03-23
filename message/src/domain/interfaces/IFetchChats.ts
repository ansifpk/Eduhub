import { IChat } from "../entities/chat";

export interface IFetchChats {
     execute(input: {
    userId: string;
  }): Promise<IChat [] | void>
}