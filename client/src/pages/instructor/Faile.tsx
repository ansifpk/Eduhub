import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import React from "react"
import { NavLink } from "react-router-dom"

const Faile = () => {
  return (
   <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <div className="h-screen flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center">
            <i className="text-9xl  bi bi-x-lg text-red-600"></i>
            <h1 className="text-red-600 font-extrabold underline">
              {" "}
              Failed to puchas the subscription
            </h1>
            <p>
              <NavLink
                className="font-extrabold underline"
                to={"/instructor/plans"}
              >
                See your Plans
              </NavLink>
            </p>
          </div>
        </div>
      </div>
   </SidebarProvider>
  )
}

export default React.memo(Faile)
