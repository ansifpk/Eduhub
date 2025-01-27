import { Navigate,  Route, Routes, } from "react-router-dom";
import InstructorLogin from "../pages/instructor/InstructorLogin.tsx";
import InstructorHome from "../pages/instructor/InstructorHome.tsx";
import ErrorPage from '../pages/ErrorPage';
import { useSelector } from "react-redux";
import InstructorProfile from "../pages/instructor/InstructorProfile.tsx";
import InstructorListStudents from "@/pages/instructor/InstructorListStudents.tsx";
import InstructorListCourses from "@/pages/instructor/InstructorListCourses.tsx";
import InstructorRegister from "@/pages/instructor/InstructorRegister.tsx";
import InstructorEditProfile from "@/pages/instructor/InstructorEditProfile.tsx";
import InstructorCreteCourse from "@/pages/instructor/InstructorCreateCourse.tsx";
import InstructorEditcourse from "@/pages/instructor/InstructorEditCourse.tsx";
import InstructorMessage from "@/pages/instructor/InstructorMessage.tsx";
import InstructorSubscriptions from "@/pages/instructor/InstructorSubscriptions.tsx";
import Subscriptions from "@/pages/instructor/Subscriptions.tsx";
import InstructorPlans from "@/pages/instructor/InstructorPlans.tsx";
import Success from "@/pages/instructor/success.tsx";
import AddSubscription from "@/pages/instructor/AddSubscription.tsx";
import SalesReports from "@/pages/instructor/SalesReports.tsx";
// import Faile from "@/pages/instructor/faile.tsx";

interface User{
  id:string,
  name:string,
  email:string,
  isVerified:boolean,
  isBlock:boolean,
  isAdmin:boolean,
  isInstructor:boolean,
}

const InstructorRoter = () => {
  const isInstructor = useSelector((state:User)=>state.isInstructor)
  const id = useSelector((state:User)=>state.id)
 
  
  return (
    <>
       <Routes>
         <Route path='/register' element={id ? <InstructorRegister/> : <Navigate to="/users/login" /> }  />
         <Route path='/login' element={isInstructor?<Navigate to="/instructor/" />:< InstructorLogin/>} />
         <Route path='/' element={isInstructor?<InstructorHome/>:<Navigate to="/users/login" />} />
         <Route path='/profile' element={isInstructor?<InstructorProfile/>:<Navigate to="/users/login" />} />
         <Route path='/editProfile' element={isInstructor?<InstructorEditProfile/>:<Navigate to="/users/login" />} />
         <Route path='/students' element={isInstructor?<InstructorListStudents/>:<Navigate to="/users/login" />} />
         <Route path='/message' element={isInstructor?<InstructorMessage/>:<Navigate to="/users/login" />} />
         <Route path='/courses' element={isInstructor?<InstructorListCourses/>:<Navigate to="/users/login" />} />
         <Route path='/createCourse' element={isInstructor?<InstructorCreteCourse/>:<Navigate to="/users/login" />} />
         <Route path='/editCourse/:courseId' element={isInstructor?<InstructorEditcourse/>:<Navigate to="/users/login" />} />
         <Route path='/subscriptions' element={isInstructor?<InstructorSubscriptions/>:<Navigate to="/users/login" />} />
         <Route path='/purchaseSubscription' element={isInstructor?<Subscriptions/>:<Navigate to="/users/login" />} />
         <Route path='/createSubscription' element={isInstructor?<AddSubscription/>:<Navigate to="/users/login" />} />
         <Route path='/success' element={isInstructor?<Success/>:<Navigate to="/users/login" />} />
         {/* <Route path='/faile' element={isInstructor?<Faile/>:<Navigate to="/users/login" />} /> */}
         <Route path='/plans' element={isInstructor?<InstructorPlans/>:<Navigate to="/users/login" />} />
         <Route path='/reports' element={isInstructor?<SalesReports/>:<Navigate to="/users/login" />} />
         <Route path='*' element={<ErrorPage/>} />  
       </Routes>
    </>
  )
}

export default InstructorRoter
