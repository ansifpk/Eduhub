import type { IUser } from '@/@types/userType'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
const Courses = React.lazy(()=> import('@/pages/user/Courses') )
const Profile = React.lazy(()=> import('@/pages/user/Profile') )
const Cart = React.lazy(()=> import('@/pages/user/Cart') )
const CourseDetailes = React.lazy(()=> import('@/pages/user/CourseDetailes') )
const Home = React.lazy(()=> import('@/pages/user/Home') )
const Login = React.lazy(()=> import('@/pages/user/Login') )
const Otp = React.lazy(()=> import('@/pages/user/Otp') )
const Regitser = React.lazy(()=> import('@/pages/user/Regitser') )
const PurchasedCourses = React.lazy(()=> import('@/pages/user/PurchasedCourses') )
const Message = React.lazy(()=> import('@/pages/user/Message') )
const Settings = React.lazy(()=> import('@/pages/user/Settings') )
const Plan = React.lazy(()=> import('@/pages/user/Plan') )
const Coupon = React.lazy(()=> import('@/pages/user/Coupon') )
const PlayCourse = React.lazy(()=> import('@/pages/user/PlayCourse') )
const InstructorProfile = React.lazy(()=> import('@/pages/user/InstructorProfile'))
const ChangeEmail = React.lazy(()=> import('@/pages/user/ChangeEmail'))
const ForgetPassword = React.lazy(()=> import('@/pages/user/ForgetPassword'))
const UserErrorPage = React.lazy(()=> import('@/pages/user/UserErrorPage'))




const UserRouter = () => {
  const userId = useSelector((state:IUser)=>state._id)
  return (
 
     <Suspense fallback={<>loading....</>}>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/user/courses' element={<Courses />} />
          <Route path="/forgetPassword" element={userId?<Navigate to={"/signIn"} replace /> : <ForgetPassword/>} />
          <Route path="/signUp" element={ userId ?<Navigate to={"/"} replace /> :<Regitser /> } />
          <Route path='/signIn' element={  userId ?<Navigate to={"/"} replace /> :<Login /> } />
          <Route path='/user/otp/:email' element={   userId ?<Navigate to={"/"} replace /> :<Otp /> } />
          <Route path='/user/cart' element={ userId ? <Cart /> :  <Navigate to={"/signIn"} replace />} />
          <Route path='/user/playCourse/:courseId' element={userId ? <PlayCourse /> : <Navigate to={"/signIn"} replace />} />
          <Route path='/user/courseDetailes/:_id' element={userId ? <CourseDetailes />: <Navigate to={"/signIn"} replace />} />          
          <Route path='/user/profile' element={userId ? <Profile /> :  <Navigate to={"/signIn"} replace />} />
          <Route path='/user/profile/course' element={userId ? <PurchasedCourses /> : <Navigate to={"/signIn"} replace />} />
          <Route path='/user/profile/message' element={userId ? <Message /> : <Navigate to={"/signIn"} replace />} />
          <Route path='/user/profile/coupon' element={userId ? <Coupon /> : <Navigate to={"/signIn"} replace />} />
          <Route path='/user/profile/plan' element={userId ? <Plan /> :  <Navigate to={"/signIn"} replace />} />
          <Route path='/user/profile/settings' element={userId ? <Settings /> :  <Navigate to={"/signIn"} replace />} /> 
          <Route path="/user/instructorProfile/:instructorId" element={userId?<InstructorProfile/>:<Navigate to={"/signIn"} replace />} />
          <Route path="/user/changeEmail" element={userId?<ChangeEmail/>:<Navigate to={"/signIn"} replace />} />
          <Route path="*" element={ userId ? <UserErrorPage /> : <Navigate to={"/signIn"} replace /> } />
      </Routes>
     </Suspense>
  
  )
}

export default UserRouter
