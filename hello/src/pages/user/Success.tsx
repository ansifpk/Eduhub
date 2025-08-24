import React from 'react'
import { NavLink } from 'react-router-dom'

const Success = () => {
  return (

      <div className="w-full">
        <div className="h-screen flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center">
            <i className="text-9xl  bi bi-check-lg text-yellow-600"></i>
            <h1 className="text-yellow-600 font-extrabold underline">
              {" "}
              Successfully puchased the course
            </h1>
            <p>
              <NavLink
                className="font-extrabold underline"
                to={"/user/profile/course"}
              >
               See your orders
              </NavLink>
            </p>
          </div>
        </div>
      </div>
  )
}

export default React.memo(Success)
