import { Iotp } from "../../../entities/otp";

export interface IVerifyOtp {
    execute(input: {
        email: string,
        otp: string
    }): Promise<void | Iotp>
}