import { ITest } from "../../entities/tests";

export interface IEditTest {
    execute(input:{ testId: string; testData: ITest}):Promise<ITest|void>
}