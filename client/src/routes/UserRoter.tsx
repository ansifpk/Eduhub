import { Navigate, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
const Home = lazy(()=>import('../pages/Home'))
// import Home from "../pages/Home"
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
import PlayCourse from "@/pages/user/PlayCourse.tsx"
import Message from "@/pages/user/Message.tsx"
import InstructorProfile from "@/pages/user/InstructorProfile.tsx"
import UserListCoupons from "@/pages/user/UserListCoupons.tsx"
import AssesmentTest from "@/pages/user/AssesmentTest.tsx"
import Settings from "@/pages/user/Settings.tsx"
import Plans from "@/pages/user/Plans.tsx"
import BrickLoader from "@/Components/user/BrickLoader.tsx"

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
       <Suspense fallback={<BrickLoader />}>
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/users/login' element={<Login/>} />
         <Route path='/users/register' element={<Register/>} /> 
         <Route path='/users/otp/:id' element={<Otp/>} /> 
         <Route path="/users/courses" element={<Courses/>} /> 
         <Route path="/users/courseDetailes/:courseId" element={id?<CourseDetailesPage/>:<Login />} /> 
         <Route path="/wishlist" element={id?<Wishlist/>:<Login />} /> 
         <Route path="/users/cart" element={id?<Cart/>:<Login />} /> 
         <Route path="/wallet" element={id?<Wallet/>:<Login />} /> 
         <Route path="/profile" element={id?<Profile/>:<Login />} /> 
         <Route path="/editUser" element={id?<EditProfile/>:<Login />} /> 
         <Route path="/profile/courses" element={id?<ListPurchasedCourses/>:<Login />} /> 
         <Route path="/profile/coupons" element={id?<UserListCoupons/>:<Login />} /> 
         <Route path="/users/forgetPassword" element={<ForgotPassword/>} /> 
         <Route path="/user/playCourse/:courseId" element={id?<PlayCourse/>:<Login />} /> 
         <Route path="/user/assesmentTest/:testId" element={id?<AssesmentTest/>:<Login />} /> 
         <Route path="/user/settings" element={id?<Settings/>:<Login />} /> 
         <Route path="/user/success" element={id?<Success/>:<Login />} /> 
         <Route path="/user/instructorProfile/:instructorId" element={id?<InstructorProfile/>:<Login />} /> 
         <Route path="/user/faile" element={id?<Faile/>:<Login />} /> 
         <Route path="/profile/message" element={id?<Message/>:<Login />} /> 
         <Route path="/profile/Plans" element={id?<Plans/>:<Login />} /> 
         <Route path="/ex" element={<ExamplePage />} /> 
         <Route path="*" element={id?<ErrorPage/>:<Login />}/>
       </Routes>
       </Suspense>
    </>
  )
}

export default UserRoter
