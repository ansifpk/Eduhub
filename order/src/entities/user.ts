export interface Iuser {
    _id:string,
    email:string,
    name:string,
    isInstructor:boolean,
    isBlock?:boolean,
    createdAt?:Date,
    avatar:{
        id:string,
        avatar_url:string
    }
 }