import { ITest } from "../../entities/tests";

export interface IAddTest{
   execute(input: {
       courseId: string;
       testData: ITest;
     }): Promise<ITest|void>
}