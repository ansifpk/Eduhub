import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";
import { IOrder } from "../../domain/entities/order";
import { NextFunction } from "express";

export class InstructorCourseOrders
  implements
    IUseCase<
      { instructorId: string; start: Date; end: Date; next: NextFunction },
      IOrder[] | void
    >
{
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: {
    instructorId: string;
    start: Date;
    end: Date;
    next: NextFunction;
  }): Promise<IOrder[] | void> {
    try {
      const { instructorId, start, end } = input;
      const user = await this.instructorRepository.userFindById(instructorId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      const orders = await this.instructorRepository.instrutcorOrders(
        user.id,
        new Date(start),
        new Date(end)
      );
      if (orders) {
        return orders;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
