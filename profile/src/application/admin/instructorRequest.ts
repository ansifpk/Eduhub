import { Iuser } from "../../domain/entities/user";
import { IAdminRepository } from "../../domain/interfaces/repositoryInterfaces/IadminRepository";
import { IInstructorRequest } from "../../domain/interfaces/useCases/admin/IInstructorRequest";

export class InstructorRequest
  implements IInstructorRequest{
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(input: {
    search: string;
    page: string;
    sort: string;
  }): Promise<Iuser[] | void> {
    try {
      const { search, page, sort } = input;
      const requests = await this.adminRepository.findIntructorRequests(
        search,
        page,
        sort
      );
      return requests;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
