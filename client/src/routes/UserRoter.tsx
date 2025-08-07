import {  Route, Routes } from "react-router-dom"
import { lazy } from "react"
import { useSelector } from "react-redux";
// import BrickLoader from "../components/BrickLoader";
import Login from "../pages/user/Login";
import RegisterForm from "../components/user/RegisterForm";
import LoginForm from "../components/user/LoginForm";
import Courses from "../pages/user/Courses";
import ErrorPage from "../pages/user/ErrorPage";
import CourseDetailesPage from "../pages/user/CourseDetailesPage";
import PlayCourse from "../pages/user/PlayCourse";
import InstructorProfile from "../pages/user/InstructorProfile";
import Profile from "../pages/user/Profile";
import ListPurchasedCourses from "../pages/user/ListPurchasedCourses";
import Message from "../pages/user/Message";
import UserListCoupons from "../pages/user/UserListCoupons";
import Settings from "../pages/user/Settings";
import Plans from "../pages/user/Plans";
import Cart from "../pages/user/Cart";
import Success from "../pages/user/Success";
import Faile from "../pages/user/Faile";
import Otp from "../pages/user/Otp";
import EditProfile from "../pages/user/EditProfile";
import AssesmentTest from "../pages/user/AssesmentTest";
import ForgotPassword from "../components/user/ForgetPassword";
const Home = lazy(()=>import("../pages/user/Home"))


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
       {/* <Suspense fallback={<BrickLoader />}> */}
       <Routes>
          <Route path='/' element={id?<Home/>:<Login />} >
             <Route path="/" element={ <LoginForm />} />
             <Route path="/signUp" element={ <LoginForm />} />
          </Route>
          <Route path='/home' element={<Home />} />
          <Route path="/users/courses" element={<Courses/>} /> 
          <Route path='/users/otp/:id' element={id?<Home/>:<Otp/>} /> 
          <Route path="/users/courseDetailes/:courseId" element={id?<CourseDetailesPage/>:<Login />} /> 
          <Route path="/user/playCourse/:courseId" element={id?<PlayCourse/>:<Login />} /> 
          {/* <Route path="/user/instructorProfile/:instructorId" element={id?<InstructorProfile/>:<Login />} />  */}
          <Route path="/profile" element={id?<Profile/>:<Login />} /> 
          <Route path="/profile/courses" element={id?<ListPurchasedCourses/>:<Login />} /> 
          <Route path="/profile/message" element={id?<Message/>:<Login />} /> 
          <Route path="/profile/coupons" element={id?<UserListCoupons/>:<Login />} /> 
          <Route path="/user/settings" element={id?<Settings/>:<Login />} /> 
          <Route path="/profile/Plans" element={id?<Plans/>:<Login />} /> 
          <Route path="/users/cart" element={id?<Cart/>:<Login />} />
          {/* <Route path="/user/success" element={id?<Success/>:<Login />} />  */}
          <Route path="/editUser" element={id?<EditProfile/>:<Login />} /> 
          {/* <Route path="/user/faile" element={id?<Faile/>:<Login />} />   */}
          {/* <Route path="/user/assesmentTest/:testId" element={id?<AssesmentTest/>:<Login />} />  */}
          {/* <Route path="/users/forgetPassword" element={<ForgotPassword/>} />  */}
          <Route path="*" element={id?<ErrorPage/>:<Login />}/>
           
          {/* <Route path="/wishlist" element={id?<Wishlist/>:<Login />} />  */}
        
       </Routes>
       {/* </Suspense> */}
    </>
  )
}

export default UserRoter
