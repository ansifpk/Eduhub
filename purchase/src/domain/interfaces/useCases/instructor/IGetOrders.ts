import { IOrder } from "../../../entities/order";

export interface IGetOrders{
    execute(input: {
        instructorId: string;
        start: string;
        end: string;
      }): Promise<IOrder[] | void>
}