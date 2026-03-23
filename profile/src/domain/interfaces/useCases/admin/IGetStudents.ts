import { Iuser } from "../../../entities/user";

export interface IGetStudents {
    execute(input: {
        search: string;
        sort: string;
        page: number;
      }): Promise<{ students: Iuser[]; pages: number } | void>
}