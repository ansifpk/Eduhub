import { ILoginUserResponseDto } from "../../../../application/dtos/user/LoginUserResponseDto ";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface IAdminLogin {
    execute(input: {
    email: string;
    password: string;
  }):Promise<{ token:IToken, admin:ILoginUserResponseDto }| void>
}