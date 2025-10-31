import { IController, IUseCase } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { ISubcription } from "../../domain/entities/subscription";

export class GetAdminSubscriptions
  implements IUseCase<{ next: NextFunction }, ISubcription[] | void>
{
  constructor(private readonly adminRepository: AdminRepository) {}
  public async execute(input: {
    next: NextFunction;
  }): Promise<ISubcription[] | void> {
    try {
      const subscriptions = await this.adminRepository.findSubscriptions();
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
