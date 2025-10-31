import { NextFunction } from "express";
import { Iuser } from "../../domain/entities/user";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepository";
import { IUseCase } from "../../shared/IUseCase";

export class GetStudents implements IUseCase<{next:NextFunction},Iuser[]|void> {
    
    constructor(private readonly instructorRepository:InstructorRepository) {}
    
    public async execute(input: {next:NextFunction}): Promise<Iuser[]|void> {
        try {
          const users = await this.instructorRepository.find();
          return users;
        } catch (error) {
            console.error(error);
            input.next(error);
        }
    }
}