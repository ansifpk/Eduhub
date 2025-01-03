export interface IUser{
    _id:string,
    name:string,
    email:string,
    isVerified:boolean,
    isBlock:boolean,
    status: string,
    isAdmin:boolean,
    isInstructor:boolean,
    createdAt:string,
    avatar:{
        id:string,
        avatar_url:string
    }
}