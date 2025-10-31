export interface ISentEmail{
    sentEmailVerification(email:string,otp:string):Promise <any>
}