import { Route, Routes } from "react-router-dom";
import UserRouter from "./routers/UserRouter";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminRouter from "./routers/AdminRouter";
import InstructorRouter from "./routers/InstructorRouter";


function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRouter/>} />
        <Route path="/admin/*" element={<AdminRouter/>} />
        <Route path="/instructor/*" element={<InstructorRouter />} />
      </Routes>
    </>
  );
}

export default App;
