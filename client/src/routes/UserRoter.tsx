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
         <Route path="/courses" element={<Courses/>} /> 
         <Route path="/wishlist" element={id?<Wishlist/>:<Login/>} /> 
         <Route path="/cart" element={id?<Cart/>:<Login/>} /> 
         <Route path="/wallet" element={id?<Wallet/>:<Login/>} /> 
         <Route path="/profile" element={id?<Profile/>:<Login/>} /> 
         <Route path="/editUser" element={id?<EditProfile/>:<Login/>} /> 
         <Route path="/forgetPassword" element={<ForgotPassword/>} /> 
         {/* <Route path="/example" element={<ForgotPassword/>} />  */}
         <Route path="*" element={<ErrorPage/>}/>
       </Routes>
    </>
  )
}

export default UserRoter
