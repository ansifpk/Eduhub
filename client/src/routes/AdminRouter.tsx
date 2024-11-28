import { Route, Routes } from "react-router-dom";
import AdminLogin from '../pages/admin/AdminLogin';
import ErrorPage from '../pages/ErrorPage';
import AdminHome from "../pages/admin/AdminHome";
import AdminCategory from "../pages/admin/AdminCategory";
import { useSelector } from "react-redux";
import AddCategory from "@/pages/admin/AddCategory";
import EditCategory from "@/pages/admin/EditCategory";
import AdminListStudents from "../pages/admin/AdminListStudents";
import AdminListInstructors from "@/pages/admin/AdminListInstructors";
import AdminListCourses from "@/pages/admin/AdminListCourses";
import AdminProfile from "@/pages/admin/AdminProfile";
import AdminEditProfile from "@/pages/admin/AdminEditProfile";
import AdminInstructorRequests from "@/pages/admin/AdminInstructorRequests";


interface User{
  id:string;
  name:string;
  email:string;
  isAdmin:boolean;
  isInstructor:boolean;
  isBlock:boolean;
}
const AdminRouter = () => {
     const id = useSelector((state:User)=>state.id)
     const isAdmin = useSelector((state:User)=>state.isAdmin)
     console.log("admin",id,isAdmin);
  return (
    <>
       <Routes>
         <Route path='/login' element={isAdmin?<AdminHome/>:<AdminLogin/>} />
         <Route path='/home' element={isAdmin?<AdminHome/>:<AdminLogin/>} />
         <Route path='/profile' element={isAdmin?<AdminProfile/>:<AdminLogin/>} />
         <Route path='/editProfile' element={isAdmin?<AdminEditProfile/>:<AdminLogin/>} />
         <Route path='/category' element={isAdmin?<AdminCategory/>:<AdminLogin/>} />
         <Route path='/addCategory' element={isAdmin?<AddCategory/>:<AdminLogin/>} />
         <Route path='/editCategory/:id' element={isAdmin?<EditCategory/>:<AdminLogin/>} />
         <Route path='/students' element={isAdmin?<AdminListStudents/>:<AdminLogin/>} />
         <Route path='/instructors' element={isAdmin?<AdminListInstructors/>:<AdminLogin/>} />
         <Route path="/instructorRequests" element={isAdmin?<AdminInstructorRequests/>:<AdminLogin/>} />
         <Route path='/courses' element={isAdmin?<AdminListCourses/>:<AdminLogin/>} />
         <Route path='*' element={<ErrorPage/>} />
       </Routes>
    </>
  )
}

export default AdminRouter
