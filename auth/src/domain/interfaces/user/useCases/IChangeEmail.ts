import { Iuser } from "../../../entities/user";

export interface IChangeEmail {
    execute(input: {
        userId: string,
        email: string,
        otp: string,
    }): Promise<Iuser | void>
}