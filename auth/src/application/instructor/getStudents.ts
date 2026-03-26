import { Iuser } from "../../domain/entities/user";
import { IGetStudents } from "../../domain/interfaces/instructor/useCases/IGetStudents";
import { IInstructorRepository } from "../../domain/interfaces/instructor/repositories/IInstructorRepository";

export class GetStudents implements IGetStudents{
    
    constructor(private readonly instructorRepository:IInstructorRepository) {}
    
    public async execute(): Promise<Iuser[]|void> {
        try {
          const users = await this.instructorRepository.find();
          return users;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}