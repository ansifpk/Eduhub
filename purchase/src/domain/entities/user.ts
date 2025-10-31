export interface Iuser {
    id:string,
    email:string,
    name:string,
    isInstructor:boolean,
    isBlock:boolean,
    isAdmin:boolean,
    avatar:{
        id:string,
        avatar_url:string
    }
 }