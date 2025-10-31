import { IUseCase } from "@eduhublearning/common";
import { IReport } from "../../domain/entities/report";
import { NextFunction } from "express";
import { AdminRepository } from "../../insfrastructure/db/repositories/adminRepository";

export class CreateReport
  implements IUseCase<{ next: NextFunction }, IReport[] | void>
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: { next: NextFunction }): Promise<any> {
    try {
      const reports = await this.adminRepository.findReports();
      if (reports) {
        return reports;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
