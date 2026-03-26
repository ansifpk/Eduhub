import { IOrder } from "../../domain/entities/order";
import { IAdminGetOrders } from "../../domain/interfaces/useCases/admin/IAdminGetOrders";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminrepository";

export class AdminGetOrders
  implements IAdminGetOrders {
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(input: {
    start: string;
    end: string;
  }): Promise<void | IOrder[]> {
    try {
      const { start, end } = input;
      const orders = await this.adminRepository.findOrders(start, end);
      return orders;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
