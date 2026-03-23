
export interface IVerifyEmail{
     execute(input: {userId:string,email:string}): Promise<string|void>
}