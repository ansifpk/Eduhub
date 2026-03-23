import { IOrder } from "../../../entities/order";

export interface IAdminGetOrders{
    execute(input: {
        start: string;
        end: string;
      }): Promise<void | IOrder[]>
}