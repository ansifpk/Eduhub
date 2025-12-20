import React from 'react'
import { useNavigate } from 'react-router-dom'

const InstructorErrorPage = () => {

    const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center">
            <i className="text-5xl  bi bi-x-lg text-red-600"></i>
            <h1 className="text-red-600 font-extrabold underline ">
             Path Not Fount
            </h1>
            <p  onClick={()=>navigate(-1)} className="font-extrabold underline cursor-pointer">
             Go Back
            </p>
          </div>
        </div>
  )
}

export default React.memo(InstructorErrorPage)
