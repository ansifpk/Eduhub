import { IToken } from "../../serviceInterfaces/IJwt";

export interface ICheckToken {
    execute(input: {
    tocken: string;
  }):Promise<IToken| void>
}