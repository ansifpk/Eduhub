import { Iuser } from "../../../entities/user";


export interface IBlockUser {
    execute(input: {
    userId: string
  }):Promise<Iuser | void>
}