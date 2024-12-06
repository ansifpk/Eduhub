
export interface Iuser {
    _id:string,
    email:string,
    name:string,
    password:string,
    isAdmin:boolean,
    status:string,
    isInstructor:boolean,
    qualification?:string,
    experience?:string,
    cv?:{
        _id:string,
        cv_url:string
    },
    certificate?:{
        _id:string,
        certificate_url:string
    },
    isBlock:boolean,
    createdAt:Date,
    avatar:{
        id:string,
        avatar_url:string
    },
   
 }