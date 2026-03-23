import { Iuser } from "../../../entities/user";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface IGetStudents {
    execute():Promise<Iuser[]| void>
}