import AppSidebar from "../../components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import React from "react";
import { NavLink } from "react-router-dom";

const Success = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <div className="h-screen flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center">
            <i className="text-9xl  bi bi-check-lg text-yellow-600"></i>
            <h1 className="text-yellow-600 font-extrabold underline">
              {" "}
              Successfully puchased the subscription
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
  );
};

export default React.memo(Success);
