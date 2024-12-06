import { Navigate, replace, Route, Routes, useNavigate } from "react-router-dom";
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
import CourseCreatePage from "@/Components/instructor/courseCreatePage.tsx";
import ExamplePage from "@/Components/ExamplePage.tsx";
import Login from "@/pages/user/Login.tsx";

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
  // const navigate = useNavigate()
  console.log(id?"ind":"illa");
  console.log(isInstructor?"isInstructor ann":"isInstructor alla");
  
  return (
    <>
       <Routes>
         <Route path='/register' element={id ? <InstructorRegister/> : <Navigate to="/users/login" /> }  />
         <Route path='/login' element={isInstructor?<InstructorHome/>:<InstructorLogin />} />
         <Route path='/' element={isInstructor?<InstructorHome/>:<InstructorLogin/>} />
         <Route path='/profile' element={isInstructor?<InstructorProfile/>:<InstructorLogin/>} />
         <Route path='/editProfile' element={isInstructor?<InstructorEditProfile/>:<InstructorLogin/>} />
         <Route path='/students' element={isInstructor?<InstructorListStudents/>:<InstructorLogin/>} />
         <Route path='/messages' element={isInstructor?<ExamplePage/>:<ExamplePage/>} />
         <Route path='/courses' element={isInstructor?<InstructorListCourses/>:<InstructorLogin/>} />
         <Route path='/createCourse' element={isInstructor?<InstructorCreteCourse/>:<InstructorLogin/>} />
         <Route path='/editCourse/:courseId' element={isInstructor?<InstructorEditcourse/>:<InstructorLogin/>} />
         <Route path='*' element={<ErrorPage/>} />  
       </Routes>
    </>
  )
}

export default InstructorRoter
