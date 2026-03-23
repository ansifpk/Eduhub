import { Iuser } from "../../../entities/user";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface IInstructorLogin {
    execute(input: {
    email: string;
    password: string;
  }):Promise<{ instructor: Iuser; token: IToken; }| void>
}