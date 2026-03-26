import { Iuser } from "../../domain/entities/user";
import { IGetStudents } from "../../domain/interfaces/instructor/IGetStudents";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class InstructorGetStudents
  implements IGetStudents {
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(input: {
    instructorId: string;
    search: string;
    sort: string;
    page: string;
  }): Promise<void | Iuser[]> {
    try {
      const { instructorId, search, sort, page } = input;
      const students = await this.instructorRepository.findStudents(
        instructorId,
        search,
        sort,
        parseInt(page)
      );

      return students;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
