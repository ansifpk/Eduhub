export interface Iuser {
   email:string,
   name:string,
   password:string,
   isAdmin?:boolean,
   isInstructor?:boolean,
   qualification?:string,
   expirienc?:string,
   cv?:string,
   isBlock?:boolean,
   isVerified?:boolean,
   createdAt?:Date,
   _id?:string,
}