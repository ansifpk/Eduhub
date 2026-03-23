import { ITest } from "../../entities/tests";

export interface ITestSubmit{
    execute(input: {
       userId: string;
       testId: string;
       mark: number;
     }): Promise<ITest | void>
}