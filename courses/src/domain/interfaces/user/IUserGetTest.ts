import { ITest } from "../../entities/tests";

export interface IUserGetTest{
   execute(input: {
       testId: string;
     }): Promise<ITest | void> 
}