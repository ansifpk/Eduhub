import { ISubcription } from "../../../entities/subscription";

export interface IGetAdminSubscriptions{
    execute():Promise<ISubcription[] | void>
}