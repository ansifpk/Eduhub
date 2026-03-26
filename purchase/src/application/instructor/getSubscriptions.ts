import { ISubcription } from "../../domain/entities/subscription";
import { IInstrutcorGetSubscriptions } from "../../domain/interfaces/useCases/instructor/IInstrutcorGetSubscriptions";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class InstrutcorGetSubscriptions
  implements IInstrutcorGetSubscriptions{
  constructor(private readonly instructorRepository: IInstructorRepository) {}
  public async execute(): Promise<ISubcription[] | void> {
    try {
      const subscriptions = await this.instructorRepository.findSubscriptions();
      if (subscriptions) {
        return subscriptions;
      }
    } catch (error) {
      console.error(error);
     throw error
    }
  }
}
