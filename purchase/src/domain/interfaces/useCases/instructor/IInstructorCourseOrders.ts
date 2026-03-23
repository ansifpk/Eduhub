import { IOrder } from "../../../entities/order";

export interface IInstructorCourseOrders{
    execute(input: {
        instructorId: string;
        start: Date;
        end: Date;
      }): Promise<IOrder[] | void>
}