import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
const UserRouter = lazy(()=>import("./routers/UserRouter"));
const AdminRouter = lazy(()=>import("./routers/AdminRouter"));
const InstructorRouter = lazy(()=>import("./routers/InstructorRouter"));


function App() {
  return (
    <Suspense fallback={<>loading....</>}>
      <Routes>
        <Route path="/*" element={<UserRouter/>} />
        <Route path="/admin/*" element={<AdminRouter/>} />
        <Route path="/instructor/*" element={<InstructorRouter />} />
      </Routes>
    </Suspense>
  );
}

export default React.memo(App);
