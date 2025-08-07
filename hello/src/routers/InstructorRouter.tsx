import type { IUserProfile } from "@/@types/userProfile";
import InstructorSubscriptions from "@/pages/instructor/InstructorSubscriptions";
import { lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
const InstructorLogin = lazy(()=>import("@/pages/instructor/InstructorLogin"))
const InstructorDashboard = lazy(()=>import("@/pages/instructor/InstructorDashboard"))
const AddCourse = lazy(()=>import("@/pages/instructor/AddCourse"))
const EditCourse = lazy(()=>import("@/pages/instructor/EditCourse"))
const InstructorAddTest = lazy(()=>import("@/pages/instructor/InstructorAddTest"))
const InstructorEditTest = lazy(()=>import("@/pages/instructor/InstructorEditTest"))
const InstructorListCourses = lazy(()=>import("@/pages/instructor/InstructorListCourses"))
const InstructorListStudents = lazy(()=>import("@/pages/instructor/InstructorListStudents"))
const InstructorMessage = lazy(()=>import("@/pages/instructor/InstructorMessage"))
const InstructorPlans = lazy(()=>import("@/pages/instructor/InstructorPlans"))
const InstructorRegister = lazy(()=>import("@/pages/instructor/InstructorRegister"))
const Success = lazy(()=>import("@/pages/instructor/Success"))
const Faile = lazy(()=>import("@/pages/instructor/Faile"))
const InstructorErrorPage = lazy(()=>import("@/pages/instructor/InstructorErrorPage"));



const InstructorRouter = () => {
  const isInstructor = useSelector((state:IUserProfile)=>state.isInstructor);
  
  return (
    <>
          <Routes>
            <Route path="/login" element={<InstructorLogin />} />
            <Route path="/" element={<InstructorDashboard />} />
            <Route path="/register" element={<InstructorRegister />} />
            <Route path="/students" element={ isInstructor ? <InstructorListStudents /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="/courses" element={ isInstructor ? <InstructorListCourses /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="/addTest/:courseId" element={ isInstructor ? <InstructorAddTest /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="/editTest/:testId" element={ isInstructor ? <InstructorEditTest /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="/message" element={ isInstructor ? <InstructorMessage /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="/createCourse" element={ isInstructor ? <AddCourse /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="/editCourse/:courseId" element={ isInstructor ? <EditCourse /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="/plans" element={ isInstructor ? <InstructorPlans /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="/subscriptions" element={ isInstructor ? <InstructorSubscriptions /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="/success" element={ isInstructor ? <Success /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="/faile" element={ isInstructor ? <Faile /> : <Navigate to={"/instructor/login"} replace /> } />
            <Route path="*" element={ isInstructor ? <InstructorErrorPage /> : <Navigate to={"/instructor/login"} replace /> } />
          </Routes>
      {/* <Routes>
        
 
        
       
       
        <Route
          path="/reports"
          element={isInstructor ? <SalesReports /> : <InstructorLogin />}
        />
      </Routes> */}
    </>
  );
};

export default InstructorRouter;
