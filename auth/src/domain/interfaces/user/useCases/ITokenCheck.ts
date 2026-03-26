import { IToken } from "../../serviceInterfaces/IJwt";

export interface ITokenCheck{
    execute(input: {tocken: string}): Promise<IToken | void>
}