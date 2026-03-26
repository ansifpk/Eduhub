import { Iuser } from "../../../entities/user";

export interface IChangePassword {
    execute(input: { email:string,
        password:string,
        confirmPassword:string}
      ): Promise<Iuser|void>
}