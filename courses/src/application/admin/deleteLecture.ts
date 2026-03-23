import { ISection } from "../../domain/entities/section";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminRepository";
import { IDeleteLecture } from "../../domain/interfaces/admin/IDeleteLecture";

export class DeleteLecture
  implements IDeleteLecture{
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(input: {
    lectureUrl: string;
  }): Promise<ISection | void> {
    try {
      const section = await this.adminRepository.deleteLecture(
        input.lectureUrl
      );
      if (section) {
        return section;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
