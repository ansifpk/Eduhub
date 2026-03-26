import { Iuser } from "../../../entities/user";


export interface IGetInstructors {
    execute():Promise<Iuser[] | void>
}