import { Navigate, Route, Routes } from "react-router-dom";
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
import AdminListCoupon from "@/pages/admin/AdminListCoupons";
import EditCoupon from "@/pages/admin/EditCoupon";
import AdminAddCoupon from "@/pages/admin/AddCoupon";
import AdminMessage from "@/pages/admin/AdminMessage";
import AdminSubscriptions from "@/pages/admin/AdminSubscriptions";
import AddSubscription from "@/pages/admin/AddSubscription";
import SalesReports from "@/pages/admin/SalesReports";


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
         <Route path='/login' element={isAdmin?<AdminHome/>:<Navigate to="/admin/login" />} />
         <Route path='/home' element={isAdmin?<AdminHome/>:<Navigate to="/admin/login" />} />
         <Route path='/profile' element={isAdmin?<AdminProfile/>:<Navigate to="/admin/login" />} />
         <Route path='/editProfile' element={isAdmin?<AdminEditProfile/>:<Navigate to="/admin/login" />} />
         <Route path='/category' element={isAdmin?<AdminCategory/>:<Navigate to="/admin/login" />} />
         <Route path='/coupon' element={isAdmin?<AdminListCoupon/>:<Navigate to="/admin/login" />} />
         <Route path='/editCoupon' element={isAdmin?<EditCoupon/>:<Navigate to="/admin/login" />} />
         <Route path='/addCoupon' element={isAdmin?<AdminAddCoupon/>:<Navigate to="/admin/login" />} />
         <Route path='/addCategory' element={isAdmin?<AddCategory/>:<Navigate to="/admin/login" />} />
         <Route path='/editCategory/:id' element={isAdmin?<EditCategory/>:<Navigate to="/admin/login" />} />
         <Route path='/students' element={isAdmin?<AdminListStudents/>:<Navigate to="/admin/login" />} />
         <Route path='/messages' element={isAdmin?<AdminMessage/>:<Navigate to="/admin/login" />} />
         <Route path='/reports' element={isAdmin?<SalesReports/>:<Navigate to="/admin/login" />} />
         <Route path='/instructors' element={isAdmin?<AdminListInstructors/>:<Navigate to="/admin/login" />} />
         <Route path="/instructorRequests" element={isAdmin?<AdminInstructorRequests/>:<Navigate to="/admin/login" />} />
         <Route path='/courses' element={isAdmin?<AdminListCourses/>:<Navigate to="/admin/login" />} />
         <Route path='/subscriptions' element={isAdmin?<AdminSubscriptions/>:<Navigate to="/admin/login" />} />
         <Route path='/addSubscription' element={isAdmin?<AddSubscription/>:<Navigate to="/admin/login" />} />
         <Route path='*' element={<ErrorPage/>} />
       </Routes>
    </>
  )
}

export default AdminRouter
