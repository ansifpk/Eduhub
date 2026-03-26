import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IOrder } from "../../domain/entities/order";
import { IInstructorCourseOrders } from "../../domain/interfaces/useCases/instructor/IInstructorCourseOrders";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class InstructorCourseOrders
  implements IInstructorCourseOrders{
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    instructorId: string;
    start: Date;
    end: Date;
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
      throw error;
    }
  }
}
