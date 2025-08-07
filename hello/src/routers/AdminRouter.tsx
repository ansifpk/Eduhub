import { Suspense ,lazy} from "react"
import type { IUser } from "@/@types/userType"
import AdminAside from "@/components/admin/AdminAside"
import { SocketProvider } from "@/context/socketContext"
const AdminCoupons = lazy(()=>import("@/pages/admin/AdminCoupons"))
const AdminListCategory = lazy(()=> import("@/pages/admin/AdminListCategory"))
const AdminListCourses = lazy(()=>import("@/pages/admin/AdminListCourses"))
const AdminListInstructors = lazy(()=>import("@/pages/admin/AdminListInstructors"))
const AdminListStudents = lazy(()=>import("@/pages/admin/AdminListStudents"))
const AdminMessage = lazy(()=>import("@/pages/admin/AdminMessage"))
const AdminSalesReport =lazy(()=>import("@/pages/admin/AdminSalesReport")) 
const AdminSubscription = lazy(()=>import("@/pages/admin/AdminSubscription"))
const Dashboard = lazy(()=>import("@/pages/admin/Dashboard"))
const InstructorsRequests = lazy(()=>import("@/pages/admin/InstructorsRequests"))
const Login  = lazy(()=>import("@/pages/admin/Login"))
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"

const AdminRouter = () => {
    const isAdmin = useSelector((state:IUser)=>state.isAdmin)
  return (
    <SocketProvider>
    <Suspense fallback={<>loading....</>}>
      <Routes>
          <Route path="/login" element={isAdmin?<AdminAside/>:<Login/>} />
          <Route path='/' element={isAdmin?<AdminAside/>:<Login/>} >
              <Route index  element={isAdmin?<Dashboard/>:<Login/>} />
              <Route path="/students"  element={isAdmin?<AdminListStudents/>:<Login/>} />
              <Route path="/instructors"  element={isAdmin?<AdminListInstructors/>:<Login/>} />
              <Route path="/instructorRequests"  element={isAdmin?<InstructorsRequests/>:<Login/>} />
              <Route path="/salesReport"  element={isAdmin?<AdminSalesReport/>:<Login/>} />
              <Route path="/courses"  element={isAdmin?<AdminListCourses/>:<Login/>} />
              <Route path="/category"  element={isAdmin?<AdminListCategory/>:<Login/>} />
              <Route path="/coupon"  element={isAdmin?<AdminCoupons/>:<Login/>} />
              <Route path="/mesage"  element={isAdmin?<AdminMessage/>:<Login/>} />
              <Route path="/subscriptions"  element={isAdmin?<AdminSubscription />:<Login/>} />
          </Route>
         
     {/* <Route path='/login' element={isAdmin?<AdminHome/>:<AdminLogin/>} />
         <Route path='/home' element={isAdmin?<AdminHome/>:<AdminLogin />} />
         <Route path='/students' element={isAdmin?<AdminListStudents/>:<AdminLogin />} />
         <Route path='/instructors' element={isAdmin?<AdminListInstructors/>:<AdminLogin />} />
         <Route path="/instructorRequests" element={isAdmin?<AdminInstructorRequests/>:<AdminLogin />} />
         <Route path='/reports' element={isAdmin?<SalesReports/>:<AdminLogin />} />
         <Route path='/courses' element={isAdmin?<AdminListCourses/>:<AdminLogin />} />
         <Route path='/category' element={isAdmin?<AdminCategory/>:<AdminLogin />} />
         <Route path='/addCategory' element={isAdmin?<AddCategory/>:<AdminLogin />} />
         <Route path='/editCategory/:id' element={isAdmin?<EditCategory/>:<AdminLogin />} />
         <Route path='/subscriptions' element={isAdmin?<AdminSubscriptions/>:<AdminLogin />} />
         <Route path='/addSubscription' element={isAdmin?<AddSubscription/>:<AdminLogin />} /> 
         <Route path='/messages' element={isAdmin?<AdminMessage/>:<AdminLogin />} />
         <Route path='/coupon' element={isAdmin?<AdminListCoupon/>:<AdminLogin />} />
         <Route path='/addCoupon' element={isAdmin?<AdminAddCoupon/>:<AdminLogin />} />
         <Route path='*' element={<ErrorPage/>} /> */}
      </Routes>
     </Suspense>
          
    </SocketProvider>
  )
}

export default AdminRouter
