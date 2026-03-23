import { ISubcription } from "../../domain/entities/subscription";
import { IGetAdminSubscriptions } from "../../domain/interfaces/useCases/admin/IGetAdminSubscriptions";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminrepository";

export class GetAdminSubscriptions
  implements IGetAdminSubscriptions{
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(): Promise<ISubcription[] | void> {
    try {
      const subscriptions = await this.adminRepository.findSubscriptions();
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
