import { cn } from "../../lib/utils";
import { buttonVariants } from "../ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logoutInstructor } from "../../Api/instructor";

export default function InstructorAside() {
  const dispatch = useDispatch();
  
  const navigate  = useNavigate()
  const handleLogout = async () => {
    const response = await logoutInstructor()
    if (response.succuss) {
      dispatch(removeUser());
      navigate("/instructor")
      return toast.success("Instructor Logout Sucessfully");
    }
  };
  return (
    <aside className="lg:block md:block sm:hidden hidden h-sceen sticky top-0 left-0">
      <ul className="list-none">
        <li>
          <NavLink
            to={"/instructor"}
            end
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                isActive
                  ? "bg-gray-600 hover:bg-gray-600 text-white no-underline"
                  : "hover:bg-gray-500 hover:text-white hover:underline text-white no-underline",
                "justify-start"
              )
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/instructor/courses"}
            end
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                isActive
                  ? "bg-gray-600 hover:bg-gray-600 text-white no-underline"
                  : "hover:bg-gray-500 hover:text-white hover:underline text-white no-underline",
                "justify-start"
              )
            }
          >
            Courses
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/instructor/students"}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                isActive
                  ? "bg-gray-600 hover:bg-gray-600 text-white no-underline"
                  : "hover:bg-gray-500 hover:text-white hover:underline text-white no-underline",
                "justify-start"
              )
            }
          >
            Students
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/instructor/message"}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                isActive
                  ? "bg-gray-600 hover:bg-gray-600 text-white no-underline"
                  : "hover:bg-gray-500 hover:text-white hover:underline text-white no-underline",
                "justify-start"
              )
            }
          >
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/instructor/subscriptions"}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                isActive
                  ? "bg-gray-600 hover:bg-gray-600 text-white no-underline"
                  : "hover:bg-gray-500 hover:text-white hover:underline text-white no-underline",
                "justify-start"
              )
            }
          >
            Subscriptions
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/instructor/plans"}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                isActive
                  ? "bg-gray-600 hover:bg-gray-600 text-white no-underline"
                  : "hover:bg-gray-500 hover:text-white hover:underline text-white no-underline",
                "justify-start"
              )
            }
          >
            Your Planse
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/instructor/reports"}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                isActive
                  ? "bg-gray-600 hover:bg-gray-600 text-white no-underline"
                  : "hover:bg-gray-500 hover:text-white hover:underline text-white no-underline",
                "justify-start"
              )
            }
          >
            Reports
          </NavLink>
        </li>
        <li
          onClick={handleLogout}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hover:bg-gray-500 hover:text-white hover:underline text-white no-underline",
            "justify-start"
          )}
        >
          Log Out
        </li>
      </ul>
    </aside>
  );
}
