export interface ISentEmail{
    sentEmailVerification(name:string,email:string,otp:string):Promise <any>
}