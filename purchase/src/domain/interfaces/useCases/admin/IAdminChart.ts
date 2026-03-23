import { IOrder } from "../../../entities/order";

export interface IAdminChart{
    execute(input: {
        start: string;
        end: string;
      }): Promise<IOrder[] | void>
}