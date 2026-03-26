import { IReport } from "../../domain/entities/report";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminRepository";
import { ICreateReport } from "../../domain/interfaces/admin/ICreateReport";

export class CreateReport
  implements ICreateReport{
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(): Promise<IReport[] | void> {
    try {
      const reports = await this.adminRepository.findReports();
      if (reports) {
        return reports;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
