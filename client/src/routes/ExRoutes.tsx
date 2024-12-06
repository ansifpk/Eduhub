import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from '../pages/user/Login.tsx'

// import ExamplePage from "../components/ExamplePage.tsx"

import { useSelector } from "react-redux"
import ErrorPage from "../pages/ErrorPage.tsx"
import Expage from "@/pages/Expage.tsx"


interface User{
  id:string,
  name:string,
  email:string,
  isVerified:boolean,
  isBlock:boolean,
  isAdmin:boolean,
  isInstructor:boolean,
}
const ExRouter = () => {
  
  const id = useSelector((state:User)=>state.id);
  return (
    <>
       <Routes>
         <Route path='/ex' element={<Expage/>} />
         <Route path='/users/login' element={<Login/>} />
         <Route path="*" element={<ErrorPage/>}/>
       </Routes>
    </>
  )
}

export default ExRouter
