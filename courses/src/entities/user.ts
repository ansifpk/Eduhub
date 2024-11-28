export interface Iuser {
    _id:string,
    email:string,
    name:string,
    isAdmin?:boolean,
    isInstructor:boolean,
    isBlock?:boolean,
    isVerified?:boolean,
    createdAt?:Date,
    avatar:{
        id:string,
        avatar_url:string
    }
 }