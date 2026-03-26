import { IChangeEmailResponseDto } from "../../../../application/dtos/user/ChangeEmailResponseDto";
import { Iuser } from "../../../entities/user";

export interface IChangeEmail {
    execute(input: {
        userId: string,
        email: string,
        otp: string,
    }): Promise<IChangeEmailResponseDto | void>
}