
export interface Iuser {
    _id:string,
    email:string,
    name:string,
    password:string,
    isAdmin:boolean,
    isInstructor:boolean,
    qualification?:string,
    expirienc?:string,
    cv?:string,
    isBlock:boolean,
    createdAt:Date,
   
 }