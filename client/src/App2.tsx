import {  Route, Routes } from "react-router-dom"
import ExRouter from "./routes/ExRoutes"



const App2 = () => {
  return (
    <div >
      <Routes>

        <Route path="/*" element={<ExRouter/>} />
        
      </Routes>
    </div>
  )
}

export default App2

