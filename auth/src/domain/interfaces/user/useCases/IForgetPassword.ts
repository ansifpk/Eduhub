
export interface IForgetPassword {
    execute(input: {email:string}): Promise<any|void>
}