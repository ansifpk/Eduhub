import React from "react";
import { Calendar, Home, Inbox, Search, Settings,PersonStanding,BookAIcon,ContactIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
const items = [
  {
    title: "Home",
    url: "/instructor",
    icon: Home,
  },
  {
    title: "Students",
    url: "/instructor/students",
    icon: ContactIcon,
  },
  {
    title: "Courses",
    url: "/instructor/courses",
    icon: BookAIcon,
  },
  {
    title: "Message",
    url: "/instructor/message",
    icon: Inbox,
  },
  {
    title: "Plans",
    url: "/instructor/plans",
    icon: Inbox,
  },
  {
    title: "Subscriptions",
    url: "/instructor/subscriptions",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "/instructor/settings",
    icon: ContactIcon,
  },
];


const AppSidebar = () => {
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
                <SidebarMenuItem  key={item.title}>
                  <NavLink
                    to={item.url}
                    end
                    className={({ isActive }) =>
                      `flex w-full gap-2   px-4 py-2 text-xs items-center-safe  rounded-md ${
                        isActive
                          ? "bg-black  text-white"
                          : " text-black"
                      }`
                    }
                  >
                    
                        <item.icon />
                        <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
