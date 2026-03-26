import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IOrder } from "../../domain/entities/order";
import { IGetOrders } from "../../domain/interfaces/useCases/instructor/IGetOrders";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class GetOrders
  implements IGetOrders{
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    instructorId: string;
    start: string;
    end: string;
  }): Promise<IOrder[] | void> {
    try {
      const { instructorId, start, end } = input;
      const checkUser = await this.instructorRepository.userFindById(
        instructorId
      );
      if (!checkUser) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      if ((start && !end) || (!start && end)) {
        throw new BadRequestError(ErrorMessages.CHART_STARTING_AND_ENDING_DATE);
      }
      const orders = await this.instructorRepository.orders(
        checkUser.id,
        start,
        end
      );

      return orders;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
