import { IUseCase } from "@eduhublearning/common";
import { NextFunction } from "express";
import { IOrder } from "../../domain/entities/order";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";

export class AdminGetOrders
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
  }): Promise<void | IOrder[]> {
    try {
      const { start, end } = input;
      const orders = await this.adminRepository.findOrders(start, end);
      return orders;
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
