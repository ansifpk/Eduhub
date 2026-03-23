import { ITest } from "../../entities/tests";

export interface ITestDetailes {
    execute(input: { testId: string }): Promise<ITest | void>
}