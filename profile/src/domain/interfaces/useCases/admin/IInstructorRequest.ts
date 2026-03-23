import { Iuser } from "../../../entities/user";

export interface IInstructorRequest {
     execute(input: {
        search: string;
        page: string;
        sort: string;
      }): Promise<Iuser[] | void> 
}