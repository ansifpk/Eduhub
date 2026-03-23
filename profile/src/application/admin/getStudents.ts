import { Iuser } from "../../domain/entities/user";
import { IGetStudents } from "../../domain/interfaces/useCases/admin/IGetStudents";
import { IAdminRepository } from "../../domain/interfaces/repositoryInterfaces/IadminRepository";

export class GetStudents
  implements IGetStudents {
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(input: {
    search: string;
    sort: string;
    page: number;
  }): Promise<{ students: Iuser[]; pages: number } | void> {
    try {
      const { search, page, sort } = input;
      const count = await this.adminRepository.getUserPages(search, sort);
      const pages = count as number;
      const students = await this.adminRepository.find(search, sort, page);
      if (students) {
        return { students, pages };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
