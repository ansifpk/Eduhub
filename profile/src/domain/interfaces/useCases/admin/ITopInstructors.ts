import { Iuser } from "../../../entities/user";

export interface ITopInstructors {
     execute(): Promise<void | Iuser[]>
}