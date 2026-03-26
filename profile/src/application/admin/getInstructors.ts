import { Iuser } from "../../domain/entities/user";
import { IGetInstructors } from "../../domain/interfaces/useCases/admin/IGetInstructors";
import { IAdminRepository } from "../../domain/interfaces/repositoryInterfaces/IadminRepository";

export class GetInstructors
  implements IGetInstructors{
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(input: {
    search: string;
    sort: string;
    page: number;
  }): Promise<Iuser[] | void> {
    try {
      const { search, sort, page } = input;
      let instructors = await this.adminRepository.findInstructors(
        search,
        sort,
        page
      );

      if (instructors) {
        return instructors;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
