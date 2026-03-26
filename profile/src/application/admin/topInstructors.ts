import { Iuser } from "../../domain/entities/user";
import { ITopInstructors } from "../../domain/interfaces/useCases/admin/ITopInstructors";
import { IAdminRepository } from "../../domain/interfaces/repositoryInterfaces/IadminRepository";

export class TopInstructors
  implements ITopInstructors {
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(): Promise<void | Iuser[]> {
    try {
      const instructors = await this.adminRepository.findTop5Instructors();
      if (instructors) {
        const data = instructors.filter(
          (value) => value.instructorReviews?.length! > 0
        );
        let users = data.filter((value) =>
          value.instructorReviews?.find((val) => val.stars >= 2.5)
        );
        if (users) {
          return users.slice(0, 5);
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
