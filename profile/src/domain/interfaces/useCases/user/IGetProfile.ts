import { Iuser } from "../../../entities/user";

export interface IGetProfile {
    execute(input: {userId: string}): Promise<Iuser|void>
}