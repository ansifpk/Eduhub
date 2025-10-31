import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";
import { NextFunction } from "express";
import { IOrder } from "../../domain/entities/order";

export class GetOrders
  implements
    IUseCase<
      { instructorId: string; start: string; end: string; next: NextFunction },
      IOrder[] | void
    >
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    instructorId: string;
    start: string;
    end: string;
    next: NextFunction;
  }): Promise<IOrder[] | void> {
    try {
      const { instructorId, start, end } = input;
      const checkUser = await this.instructorRepository.userFindById(
        instructorId
      );
      if (!checkUser) {
        throw new BadRequestError("user Not found");
      }
      if ((start && !end) || (!start && end)) {
        throw new BadRequestError("PLease select starting and ending dates!");
      }
      const orders = await this.instructorRepository.orders(
        checkUser.id,
        start,
        end
      );

      return orders;
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
