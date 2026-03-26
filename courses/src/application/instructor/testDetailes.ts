import { ITest } from "../../domain/entities/tests";
import { ITestDetailes } from "../../domain/interfaces/instructor/ITestDetailes";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";

export class TestDetailes
  implements ITestDetailes {
  constructor(private readonly instructorRepository: IInstructorRepository) {}
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
