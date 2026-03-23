import { IAdmin } from "../../../entities/admin";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface IAdminLogin {
    execute(input: {
    email: string;
    password: string;
  }):Promise<{ token:IToken, admin:IAdmin }| void>
}