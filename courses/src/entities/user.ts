export interface Iuser {
    _id:string,
    email:string,
    name:string,
    isAdmin:boolean,
    isInstructor:boolean,
    isBlock:boolean,
    avatar:{
        id:string,
        avatar_url:string
    },
    createdAt:Date
 }