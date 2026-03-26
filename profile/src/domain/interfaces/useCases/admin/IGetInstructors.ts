import { Iuser } from "../../../entities/user";

export interface IGetInstructors {
    execute(input: {
        search: string;
        sort: string;
        page: number;
      }): Promise<Iuser[] | void>
}