import React from 'react'
import { NavLink } from 'react-router-dom'

const Success = () => {
  return (
     <div className="h-[100vh] flex items-center justify-center bg-black">
         <div className="flex flex-col items-center justify-center">
           <h1 className="text-warning"> Successfully puchased the subscription</h1>
            <p className="text-white"><NavLink className="text-white" to={"/instructor/plans"}>See your Plans</NavLink></p>
         </div>
     </div>   
  )
}

export default Success
