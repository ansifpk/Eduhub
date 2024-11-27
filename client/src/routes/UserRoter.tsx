import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from '../pages/user/Login.tsx'
import Register from "../pages/Register"
import Otp from "../Components/user/Otp.tsx"
// import ExamplePage from "../components/ExamplePage.tsx"
import Courses from "../pages/user/Courses.tsx"
import { useSelector } from "react-redux"
import ErrorPage from "../pages/ErrorPage.tsx"
import Wishlist from "../pages/user/Wishlist.tsx"
import Profile from '../pages/user/Profile.tsx'
import Cart from "../pages/user/Cart.tsx"
import { Wallet } from "lucide-react"
import EditProfile from "../pages/user/EditProfile.tsx"
import ForgotPassword from "../Components/user/ForgetPassword.tsx"
import CourseDetailesPage from "@/pages/user/CourseDetailesPage.tsx"
import Success from "@/pages/user/Success.tsx"
import Faile from "@/pages/user/Faile.tsx"
import ExamplePage from "@/Components/ExamplePage.tsx"
import ListPurchasedCourses from "@/pages/user/ListPurchasedCourses.tsx"

interface User{
  id:string,
  name:string,
  email:string,
  isVerified:boolean,
  isBlock:boolean,
  isAdmin:boolean,
  isInstructor:boolean,
}
const UserRoter = () => {
  
  const id = useSelector((state:User)=>state.id);
  return (
    <>
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} /> 
         <Route path='/otp/:id' element={<Otp/>} /> 
         <Route path="/user/courses" element={<Courses/>} /> 
         <Route path="/user/courseDetailes/:courseId" element={id?<CourseDetailesPage/>:<Login/>} /> 
         <Route path="/wishlist" element={id?<Wishlist/>:<Login/>} /> 
         <Route path="/cart" element={id?<Cart/>:<Login/>} /> 
         <Route path="/wallet" element={id?<Wallet/>:<Login/>} /> 
         <Route path="/profile" element={id?<Profile/>:<Login/>} /> 
         <Route path="/editUser" element={id?<EditProfile/>:<Login/>} /> 
         <Route path="/profile/courses" element={id?<ListPurchasedCourses/>:<Login/>} /> 
         <Route path="/forgetPassword" element={<ForgotPassword/>} /> 
         <Route path="/user/success" element={<Success/>} /> 
         <Route path="/user/faile" element={<Faile/>} /> 
         {/* <Route path="/example" element={<ExamplePage/>} />  */}
         <Route path="*" element={<ErrorPage/>}/>
       </Routes>
    </>
  )
}

export default UserRoter
