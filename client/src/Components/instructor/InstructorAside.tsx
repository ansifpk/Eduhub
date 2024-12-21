import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { NavLink } from "react-router-dom"
import { Separator } from "../ui/separator"
import { removeUser } from "@/redux/authSlice"
import { useDispatch } from "react-redux"
import { logout } from "@/Api/user"
import toast from "react-hot-toast"



export default function InstructorAside() {
  const dispatch = useDispatch();
  
  const handleLogout = async() =>{
    const response = await logout();
    if(response.succuss){
        dispatch(removeUser())
      return  toast.success("Instructor Logout Sucessfully")
    }
  }
  return (
    <aside className="w-mx-4 lg:w-1/6 h-[65vh] sticky top-0">
       
       <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 ">
      <NavLink
          to={"/instructor"}
          end
          className={({isActive})=>cn(
            buttonVariants({ variant: "ghost" }),
            isActive
              ? "bg-gray-600 hover:bg-gray-600 text-white no-underline"
              : "hover:bg-transparent hover:underline text-white no-underline",
            "justify-start"
          )}
        >
          Home
        </NavLink>
      <NavLink
          to={"/instructor/courses"}
          end
          className={({isActive})=>cn(
            buttonVariants({ variant: "ghost" }),
            isActive
              ? "bg-gray-600 hover:bg-gray-600 text-white no-underline"
              : "hover:bg-transparent hover:underline text-white no-underline",
            "justify-start"
          )}
        >
          Courses
        </NavLink>
      <NavLink
          to={"/instructor/students"}
          className={({isActive})=>cn(
            buttonVariants({ variant: "ghost" }),
            isActive
              ? "bg-gray-600 hover:bg-gray-600 text-white no-underline"
              : "hover:bg-transparent hover:underline text-white no-underline",
            "justify-start"
          )}
        >
          Students
        </NavLink>
      <li
          // to={"/instructor/login"}
          onClick={handleLogout}
          
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hover:bg-transparent hover:underline text-white no-underline",
            "justify-start"
          )}
        >
          Log Out
        </li>
    </nav>
   
          </aside>
   
    
  )
}
