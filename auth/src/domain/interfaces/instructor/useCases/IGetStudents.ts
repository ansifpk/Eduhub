import { ILoginUserResponseDto } from "../../../../application/dtos/user/LoginUserResponseDto ";


export interface IGetStudents {
    execute():Promise<ILoginUserResponseDto[]| void>
}