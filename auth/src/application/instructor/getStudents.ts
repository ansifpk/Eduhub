import { IGetStudents } from "../../domain/interfaces/instructor/useCases/IGetStudents";
import { IInstructorRepository } from "../../domain/interfaces/instructor/repositories/IInstructorRepository";
import { mapUserToLoginDto } from "../mapers/user/mapUserToLoginDto";
import { ILoginUserResponseDto } from "../dtos/user/LoginUserResponseDto ";

export class GetStudents implements IGetStudents{
    
    constructor(private readonly instructorRepository:IInstructorRepository) {}
    
    public async execute(): Promise<ILoginUserResponseDto[]|void> {
        try {
          const users = await this.instructorRepository.find();
          const usersDto = users?.map(user => mapUserToLoginDto(user));
          return usersDto;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}