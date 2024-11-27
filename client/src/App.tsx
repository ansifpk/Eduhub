import {  Route, Routes } from "react-router-dom"
import UserRoter from "./routes/UserRoter"
import InstructorRoter from "./routes/InstructorRouter"
import AdminRouter from "./routes/AdminRouter"


const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/*" element={<UserRoter/>} />
        <Route path="/instructor/*" element={<InstructorRoter/>} />
        <Route path="/admin/*" element={<AdminRouter/>} />
      </Routes>
    </div>
  )
}

export default App
