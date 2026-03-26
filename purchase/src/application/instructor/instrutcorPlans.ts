import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IInstructorSubscribe } from "../../domain/entities/instructorSubscribe";
import { IInstructorPlans } from "../../domain/interfaces/useCases/instructor/IInstructorPlans";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class InstructorPlans
  implements IInstructorPlans {
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    userId: string;
  }): Promise<IInstructorSubscribe[] | void> {
    try {
      const { userId } = input;
      const user = await this.instructorRepository.userFindById(userId);
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      const plans = await this.instructorRepository.findPlans(userId);
      if (plans) {
        return plans;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
