import { ITest } from "../../domain/entities/tests";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { ITestDetailes } from "../../domain/interfaces/instructor/ITestDetailes";

export class TestDetailes
  implements ITestDetailes {
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public async execute(input: { testId: string}): Promise<ITest | void> {
    try {
      const { testId } = input;
      const test = await this.instructorRepository.findTest(testId);

      if (test) {
        return test;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
