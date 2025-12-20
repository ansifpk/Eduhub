import React, { Suspense ,lazy} from "react"
import type { IUser } from "@/@types/userType"
import { SocketProvider } from "@/context/socketContext"
const AdminCoupons = lazy(()=>import("@/pages/admin/AdminCoupons"))
const AdminListCategory = lazy(()=> import("@/pages/admin/AdminListCategory"))
const AdminListCourses = lazy(()=>import("@/pages/admin/AdminListCourses"))
const AdminListInstructors = lazy(()=>import("@/pages/admin/AdminListInstructors"))
const AdminListStudents = lazy(()=>import("@/pages/admin/AdminListStudents"))
const AdminMessage = lazy(()=>import("@/pages/admin/AdminMessage"))
const AdminSubscription = lazy(()=>import("@/pages/admin/AdminSubscription"))
const Dashboard = lazy(()=>import("@/pages/admin/Dashboard"))
const InstructorsRequests = lazy(()=>import("@/pages/admin/InstructorsRequests"))
const Login  = lazy(()=>import("@/pages/admin/Login"))
const AdminCreateCoupon = lazy(()=>import("@/pages/admin/AdminCreateCoupon"))
const AdminAddCategory = lazy(()=>import("@/pages/admin/AdminAddCategory"))
const AdminAside = lazy(()=>import("@/components/admin/AdminAside"))
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
              <Route path="/courses"  element={isAdmin?<AdminListCourses/>:<Login/>} />
              <Route path="/category"  element={isAdmin?<AdminListCategory/>:<Login/>} />
              <Route path="/createCategory"  element={isAdmin?<AdminAddCategory/>:<Login/>} />
              <Route path="/coupon"  element={isAdmin?<AdminCoupons/>:<Login/>} />
              <Route path="/createCoupon"  element={isAdmin?<AdminCreateCoupon/>:<Login/>} />
              <Route path="/mesage"  element={isAdmin?<AdminMessage/>:<Login/>} />
              <Route path="/subscriptions"  element={isAdmin?<AdminSubscription />:<Login/>} />
          </Route>
      </Routes>
     </Suspense>
          
    </SocketProvider>
  )
}

export default React.memo(AdminRouter)
