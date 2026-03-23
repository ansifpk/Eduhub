import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IOrder } from "../../domain/entities/order";
import { IAdminChart } from "../../domain/interfaces/useCases/admin/IAdminChart";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminrepository";

export class AdminChart
  implements IAdminChart {
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(input: {
    start: string;
    end: string;
  }): Promise<IOrder[] | void> {
    try {
      const { start, end } = input;
      if ((start && !end) || (!start && end)) {
        throw new BadRequestError(ErrorMessages.CHART_STARTING_AND_ENDING_DATE);
      }
      const orders = await this.adminRepository.findChartOrders(start, end);
      if (orders) {
        return orders;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
