import React from "react"
import { NavLink } from "react-router-dom"

const SubscriptionFaile = () => {
  return (
      <div className="w-full">
        <div className="h-screen flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center">
            <i className="text-9xl  bi bi-x-lg text-red-600"></i>
            <h1 className="text-red-600 font-extrabold underline">
              {" "}
               Failed to puchase subscription
            </h1>
            <p>
              <NavLink
                className="font-extrabold underline"
                to={"/user/profile/plan"}
              >
                See your Plans
              </NavLink>
            </p>
          </div>
        </div>
      </div>
  )
}

export default React.memo(SubscriptionFaile)
