import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Api/user";
import { removeUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import toast from "react-hot-toast";

const ProfileNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const data = await logout();
    if (data.succuss) {
      localStorage.setItem("accessToken", "");
      localStorage.setItem("refreshToken", "");
      dispatch(removeUser());
      toast.success("logout");
      return navigate("/users/login");
    }
  };
  const navs = [
    { name: "Profile", path: "/profile" },
    { name: "Courses", path: "/profile/courses" },
    { name: "Messages", path: "/profile/message" },
    { name: "Coupons", path: "/profile/coupons" },
    { name: "Plans", path: "/profile/Plans" },
    { name: "Settings", path: "/user/settings" },
  ];
  return (
    <div className="md:mt-16 mt-8 pt-2 sm:px-6 lg:px-8 mx-auto gap-5">
      <div className="mx-auto mx:auto ">
      <ul className=" flex rounded-pill bg-teal-500 px-2 py-2 items-center justify-center sm:space-x-6 md:space-x-6 w-full sm:w-full md:w-9/12 lg:w-7/12 space-x-3 mx-auto">
        {navs.map((value, index) => (
          <li key={index} className="flex-shrink">
            <NavLink
              end
              className={({ isActive }) =>
                isActive
                  ? "px-4  py-1  text-sm rounded-full text-black bg-gray-100  no-underline"
                  : "no-underline text-sm  text-white"
              }
              to={value.path}
            >
              {value.name}
            </NavLink>
          </li>
        ))}
        <li className="flex-shrink-0">
          <AlertDialog >
            <AlertDialogTrigger asChild>
              <Link className="text-sm text-white no-underline" to={""}>
                Log Out
              </Link>
            </AlertDialogTrigger>
            <AlertDialogContent className="md:w-full w-50">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure to log out from EduHub ?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex md:flex-end flex-row justify-center gap-1" >
                <AlertDialogAction
                  className="rounded-full  bg-[#49BBBD]"
                  type="button"
                >
                  Cancel
                </AlertDialogAction>
                <AlertDialogAction
                  className="rounded-full bg-[#49BBBD] "
                  type="button"
                  onClick={handleLogout}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </li>
      </ul>
      </div>
      
    </div>
  );
};

export default ProfileNavbar;
