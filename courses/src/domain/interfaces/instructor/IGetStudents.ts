import { Iuser } from "../../entities/user";

export interface IGetStudents{
     execute(input: {
        instructorId: string;
        search: string;
        sort: string;
        page: string;
      }): Promise<void | Iuser[]> 
}