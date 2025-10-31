import { IRating } from "./ratings"

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
        id:string,
        cv_url:string
    },
    certificate?:{
        id:string,
        certificate_url:string
    },
    isBlock:boolean,
    createdAt:Date,
    instructorReviews?:IRating[],
    avatar:{
        id:string,
        avatar_url:string
    },
    about:string,
    thumbnail:string
   
 }