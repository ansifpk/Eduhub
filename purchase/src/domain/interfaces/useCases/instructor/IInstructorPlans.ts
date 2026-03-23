import { IInstructorSubscribe } from "../../../entities/instructorSubscribe";

export interface IInstructorPlans{
    execute(input: {
        userId: string;
      }): Promise<IInstructorSubscribe[] | void>
}