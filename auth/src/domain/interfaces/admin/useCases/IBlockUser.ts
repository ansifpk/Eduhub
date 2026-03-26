import { IBlockUserResponseDto } from "../../../../application/dtos/admin/BlockUserResponseDto";


export interface IBlockUser {
    execute(input: {
    userId: string
  }):Promise<IBlockUserResponseDto | void>
}