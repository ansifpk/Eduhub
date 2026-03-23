import { Iuser } from "../../../entities/user";


export interface IGetStudents {
    execute():Promise<Iuser[] | void>
}