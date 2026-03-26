import { Iuser } from "../../../entities/user";

export interface IInstructorAprovel {
    execute(input: {
        email: string;
        status: string;
      }): Promise<Iuser | void>
}