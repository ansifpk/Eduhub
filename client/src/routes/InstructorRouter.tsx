import { Route, Routes } from "react-router-dom";
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
  return (
    <>
       <Routes>
         <Route path='/register' element={<InstructorRegister/>} />
         <Route path='/login' element={isInstructor?<InstructorHome/>:<InstructorLogin/>} />
         <Route path='/' element={isInstructor?<InstructorHome/>:<InstructorLogin/>} />
         <Route path='/profile' element={isInstructor?<InstructorProfile/>:<InstructorLogin/>} />
         <Route path='/editProfile' element={isInstructor?<InstructorEditProfile/>:<InstructorLogin/>} />
         <Route path='/students' element={isInstructor?<InstructorListStudents/>:<InstructorLogin/>} />
         {/* <Route path='/messages' element={isInstructor?<Example/>:<Example/>} /> */}
         <Route path='/courses' element={isInstructor?<InstructorListCourses/>:<InstructorLogin/>} />
         <Route path='/createCourse' element={isInstructor?<InstructorCreteCourse/>:<InstructorLogin/>} />
         <Route path='*' element={<ErrorPage/>} />  
       </Routes>
    </>
  )
}

export default InstructorRoter
