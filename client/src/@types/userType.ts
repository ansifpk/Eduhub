export interface IUser{
    _id:string,
    name:string,
    email:string,
    isVerified:boolean,
    isBlock:boolean,
    isAdmin:boolean,
    isInstructor:boolean,
    avatar:{
        id:string,
        avatar_url:string
    }
 }