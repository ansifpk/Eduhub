import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IUserSubcription } from "../../domain/entities/userSubscription";
import { IInstructorSubscriptions } from "../../domain/interfaces/useCases/instructor/IInstructorSubscriptions";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class InstructorSubscriptions implements IInstructorSubscriptions {
    constructor(private readonly instructorRepository:IInstructorRepository) {
        
    }
    public async execute(input: {instructorId: string}): Promise<IUserSubcription[]|void> {
        try {
            const {instructorId} = input;
              const user = await this.instructorRepository.userFindById(instructorId);
              if (!user) {
                throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
              }
              const subscriptions =
                await this.instructorRepository.findInstructorSubscriptions(instructorId);
              if (subscriptions) {
                return subscriptions;
              }
            } catch (error) {
              console.error(error);
              throw error;
            }
    }
}