import  {  useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useSelector } from "react-redux";
import type { IUser } from "@/@types/userType";
// import { Select } from "@/components/ui/select";

const Ex = () => {
    const [open, setOpen] = useState(false);
  const userId = useSelector((state: IUser) => state._id);
 
  const navigate = useNavigate();
 




  const navbar = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/user/courses" },
    { name: "Cart", path: "/user/cart" },
  ];

  return (
        <>
      <div className="px-5 flex h-14 justify-between font-light items-center  bg-teal-400 text-white text-sm ">
        <span className="font-bold text-2xl flex items-center font-[poppins] text-gray-800">
          EduHub
        </span>
        <div className="flex md:hidden lg:hidden sm:hidden cursor-pointer items-center">
          {open ? (
              <i className="bi bi-x-lg" onClick={() => setOpen(!open)}></i>
       
          ) : (
              <i className="bi bi-list" onClick={() => setOpen(!open)}></i>
          )}
        </div>
        
        <ul className={`md:flex  hidden gap-10 items-center`}>
          {navbar.map((value) => (
            <li key={value.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-300/50 px-4 py-2 rounded-full"
                    : "hover:bg-gray-300/50 px-4 py-2 rounded-full"
                }
                to={value.path}
              >
                {value.name}
              </NavLink>
            </li>
          ))}
          {userId ? (
            <li>
              <Select
                
              >
                <SelectTrigger className="">
                  <Avatar>
                    
                    <AvatarFallback>
                      <i className="bi bi-person-circle"></i>
                    </AvatarFallback>
                  </Avatar>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem  className="cursor-pointer" value="Profile">
                    Profile
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Sign Out">
                    Sign Out
                  </SelectItem>
                </SelectContent>
              </Select>
            </li>
          ) : (
            <>
              <li className="hover:bg-gray-300/50 px-4 py-2 border rounded-full">
                <NavLink to={"/signIn"}>Sign In</NavLink>
              </li>
              <li className="hover:bg-gray-300/50 px-4 py-2 border rounded-full">
                <NavLink to={"/signUp"}>Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      {
        open&&<ul className={`md:hidden flex flex-col  bg-teal-400 text-white items-end-safe gap-5 p-2`}>
          {navbar.map((value) => (
            <li key={value.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-300/50 px-4 py-2 rounded-full"
                    : "hover:bg-gray-300/50 px-4 py-2 rounded-full"
                }
                to={value.path}
              >
                {value.name}
              </NavLink>
            </li>
          ))}
          {userId ? (
            <li>
              <Select
                
              >
                <SelectTrigger className="">
                  <Avatar>
                    
                    <AvatarFallback>
                      <i className="bi bi-person-circle"></i>
                    </AvatarFallback>
                  </Avatar>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem  className="cursor-pointer" value="Profile">
                    Profile
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Sign Out">
                    Sign Out
                  </SelectItem>
                </SelectContent>
              </Select>
            </li>
          ) : (
            <>
              <li className="hover:bg-gray-300/50 px-4 py-2 border rounded-full">
                <NavLink to={"/signIn"}>Sign In</NavLink>
              </li>
              <li className="hover:bg-gray-300/50 px-4 py-2 border rounded-full">
                <NavLink to={"/signUp"}>Sign Up</NavLink>
              </li>
            </>
          )}
      </ul>
      }
      
    </>
  )
}

export default Ex
