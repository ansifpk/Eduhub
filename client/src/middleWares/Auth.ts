import { useSelector } from "react-redux";

interface User{
    id:string,
    name:string,
    email:string,
    isVerified:boolean,
    isBlock:boolean,
    isAdmin:boolean,
    isInstructor:boolean,
 }

export const isAuth = async ()=>{
  const id = useSelector((state:User)=>state.id)
  const isBlock = useSelector((state:User)=>state.isBlock)
  console.log(id&&!isBlock?true:false,"midleware")
  if(id&&isBlock == false){
    return true
  }else{
    return false
  }
 

//   console.log(id&&isBlock==false?true:false)
}