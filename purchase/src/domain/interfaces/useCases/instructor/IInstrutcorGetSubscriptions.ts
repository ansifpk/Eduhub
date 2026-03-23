import { ISubcription } from "../../../entities/subscription";

export interface IInstrutcorGetSubscriptions{
    execute(): Promise<ISubcription[]|void>
}