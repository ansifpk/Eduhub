import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../pages/user/ErrorPage";
import InstructorHome from "../pages/instructor/InstructorHome";
import InstructorLogin from "../pages/instructor/InstructorLogin";
import InstructorListStudents from "../pages/instructor/InstructorListStudents";
import InstructorListCourses from "../pages/instructor/InstructorListCourses";
import AddTest from "../components/instructor/AddTest";
import EditTest from "../components/instructor/EditTest";
import InstructorCreateCourses from "../pages/instructor/InstructorCreateCourse";
import InstructorEditcourse from "../pages/instructor/InstructorEditCourse";
import InstructorMessage from "../pages/instructor/InstructorMessage";
import InstructorSubscriptions from "../pages/instructor/InstructorSubscriptions";
import AddSubscription from "../pages/instructor/AddSubscription";
import InstructorPlans from "../pages/instructor/InstructorPlans";
import SalesReports from "../pages/instructor/SalesReports";
import Subscriptions from "../pages/instructor/Subscriptions";
import Success from "../pages/instructor/success";
import Faile from "../pages/instructor/Faile";

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isBlock: boolean;
  isAdmin: boolean;
  isInstructor: boolean;
}

const InstructorRoter = () => {
  const isInstructor = useSelector((state: User) => state.isInstructor);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<InstructorLogin />}
        />
        <Route
          path="/home"
          element={isInstructor ? <InstructorHome /> : <InstructorLogin />}
        />
        <Route
          path="/students"
          element={
            isInstructor ? <InstructorListStudents /> : <InstructorLogin />
          }
        />
        <Route
          path="/courses"
          element={
            isInstructor ? <InstructorListCourses /> : <InstructorLogin />
          }
        />
        <Route
          path="/addTest/:courseId"
          element={isInstructor ? <AddTest /> : <InstructorLogin />}
        />
        <Route
          path="/editTest/:testId"
          element={isInstructor ? <EditTest /> : <InstructorLogin />}
        />
        <Route
          path="/createCourse"
          element={
            isInstructor ? <InstructorCreateCourses /> : <InstructorLogin />
          }
        />
        <Route
          path="/editCourse/:courseId"
          element={
            isInstructor ? <InstructorEditcourse /> : <InstructorLogin />
          }
        />
        <Route
          path="/message"
          element={isInstructor ? <InstructorMessage /> : <InstructorLogin />}
        />
        <Route
          path="/subscriptions"
          element={
            isInstructor ? <InstructorSubscriptions /> : <InstructorLogin />
          }
        />
        <Route
          path="/createSubscription"
          element={isInstructor ? <AddSubscription /> : <InstructorLogin />}
        />
        <Route
          path="/plans"
          element={isInstructor ? <InstructorPlans /> : <InstructorLogin />}
        />
        <Route
          path="/reports"
          element={isInstructor ? <SalesReports /> : <InstructorLogin />}
        />
        <Route
          path="/purchaseSubscription"
          element={isInstructor ? <Subscriptions /> : <InstructorLogin />}
        />
        <Route
          path="/success"
          element={isInstructor ? <Success /> : <InstructorLogin />}
        />
        <Route
          path="/faile"
          element={isInstructor ? <Faile /> : <InstructorLogin />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default InstructorRoter;
