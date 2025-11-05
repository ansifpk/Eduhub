import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { NextFunction } from "express";
import { IOrder } from "../../domain/entities/order";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";

export class AdminChart
  implements
    IUseCase<
      { start: string; end: string; next: NextFunction },
      IOrder[] | void
    >
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: {
    start: string;
    end: string;
    next: NextFunction;
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
      input.next(error);
    }
  }
}
