import type { IUser } from '@/@types/userType'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
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
const InstructorProfile = React.lazy(()=> import('@/pages/user/InstructorProfile') )




const UserRouter = () => {
  const userId = useSelector((state:IUser)=>state._id)
  return (
    <>
     <Suspense fallback={<>loading....</>}>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/signUp" element={ <Regitser />} />
          <Route path='/signIn' element={<Login />} />
          <Route path='/user/otp/:email' element={<Otp />} />
          <Route path='/user/cart' element={   userId ? <Cart /> :  <Login /> } />
          <Route path='/user/courses' element={<Courses />} />
          <Route path='/user/playCourse/:courseId' element={userId ? <PlayCourse /> : <Login/>} />
          <Route path='/user/courseDetailes/:_id' element={userId ? <CourseDetailes /> :  <Login />} />
          <Route path='/user/otp/2' element={<Otp />} />
          <Route path='/user/profile' element={userId ? <Profile /> :  <Login />} />
          <Route path='/user/profile/course' element={userId ? <PurchasedCourses /> :  <Login />} />
          <Route path='/user/profile/message' element={userId ? <Message /> :  <Login />} />
          <Route path='/user/profile/coupon' element={userId ? <Coupon /> :  <Login />} />
          <Route path='/user/profile/plan' element={userId ? <Plan /> :  <Login />} />
          <Route path='/user/profile/settings' element={userId ? <Settings /> :  <Login />} /> 
          <Route path="/user/instructorProfile/:instructorId" element={userId?<InstructorProfile/>:<Login />} />
      </Routes>
     </Suspense>
    </>
  )
}

export default UserRouter
