import { Home, Inbox, BookAIcon, ContactIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import useRequest from "@/hooks/useRequest";
import toast from "react-hot-toast";
import { removeUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from "./ui/sidebar";
const items = [
  {
    title: "Home",
    url: "/instructor",
    icon: <Home />,
  },
  {
    title: "Students",
    url: "/instructor/students",
    icon: <ContactIcon />,
  },
  {
    title: "Courses",
    url: "/instructor/courses",
    icon: <BookAIcon />,
  },
  {
    title: "Message",
    url: "/instructor/message",
    icon: <Inbox />,
  },
  {
    title: "Plans",
    url: "/instructor/plans",
    icon: <i className="bi bi-patch-check-fill text-2xl"></i>,
  },
  {
    title: "Subscriptions",
    url: "/instructor/subscriptions",
    icon: <i className="bi bi-calendar-check me-2 text-2xl"></i>,
  }
];

const AppSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doRequest, err } = useRequest();
  const handleLogout = () => {

    doRequest({
      url: instructorRoutes.logout,
      body: {},
      method: "post",
      onSuccess: () => {
        toast.success("Logout Succeefully");
        dispatch(removeUser());
        navigate("/instructor/login");
      },
    });
  };

  useEffect(()=>{
    err?.map((err)=>toast.error(err.message));
  },[err]);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="space-y-5">
          <SidebarHeader className=" flex justify-center-safe">
            <span className=" text-3xl font-extrabold ">EduHub</span>
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end
                    className={({ isActive }) =>
                      `flex w-full gap-2   px-4 py-2 text-xs items-center-safe  rounded-md ${
                        isActive ? "bg-black  text-white" : " text-black"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <div
                  onClick={handleLogout}
                  className={`flex w-full gap-2 cursor-pointer  px-4 py-2 text-xs items-center-safe  rounded-mdtext-black`}
                >
                  <i className="bi bi-power text-red-600 text-2xl "></i>
                  <span>Log out</span>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default React.memo(AppSidebar);
