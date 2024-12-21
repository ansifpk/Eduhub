export interface IUser{
    _id:string,
    name:string,
    email:string,
    avatar:{
      id:string,
      avatar_url:string
    },
    isInstructor:boolean,
    isAdmin:boolean,
    isBlock:boolean,
}