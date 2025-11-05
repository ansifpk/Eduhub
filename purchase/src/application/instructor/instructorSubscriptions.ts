import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";
import { IUserSubcription } from "../../domain/entities/userSubscription";
import { NextFunction } from "express";

export class InstructorSubscriptions implements IUseCase<{instructorId: string,
    next: NextFunction},IUserSubcription[]|void> {
    constructor(private readonly instructorRepository:InstructorRepository) {
        
    }
    public async execute(input: {instructorId: string,
        next: NextFunction}): Promise<IUserSubcription[]|void> {
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
              input.next(error);
            }
    }
}