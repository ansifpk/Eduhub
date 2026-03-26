import { ILoginUserResponseDto } from "../../../../application/dtos/user/LoginUserResponseDto ";
import { IToken } from "../../serviceInterfaces/IJwt";

export interface IInstructorLogin {
    execute(input: {
    email: string;
    password: string;
  }):Promise<{ instructor: ILoginUserResponseDto; token: IToken; }| void>
}