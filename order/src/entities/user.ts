export interface Iuser {
    _id:string,
    email:string,
    name:string,
    password:string,
    isAdmin?:boolean,
    isInstructor:boolean,
    qualification?:string,
    experience?:string,
    cv?:string,
    isBlock?:boolean,
    isVerified?:boolean,
    createdAt?:Date,
 }