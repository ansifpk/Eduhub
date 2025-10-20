import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import userRoutes from "@/service/endPoints/userEndPoints";
import useRequest from "@/hooks/useRequest";
import { changeImage, removeUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { IUser } from "@/@types/userType";

const Header = () => {
  const [open, setOpen] = useState(false);
  const userId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const image = useSelector((state:{ [key: string]: string })=>state.image);

  const handleLogout = async () => {
    await doRequest({
      url: userRoutes.logout,
      method: "post",
      body: {},
      onSuccess: () => {
        dispatch(removeUser());
        toast.success("Logout Successfully");
        return navigate("/signIn");
      },
    });
  };

  useEffect(() => {
    if (userId) {
      doRequest({
        url: `${userRoutes.profile}?userId=${userId}`,
        method: "get",
        body: {},
        onSuccess: (res) => {
          dispatch(changeImage(res.userData.avatar.avatar_url))
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  const navbar = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/user/courses" },
    { name: "Cart", path: "/user/cart" },
  ];
  return (
    <>
      <div className="px-5 hidden md:flex lg:flex sm:flex   h-14 justify-between font-light items-center  bg-teal-400 text-white text-sm ">
        <span className="font-bold text-2xl flex items-center font-[poppins] text-gray-800">
          EduHub
        </span>
        <div className="flex md:hidden lg:hidden sm:hidden cursor-pointer absolute right-8 top-0">
          {open ? (
            <>
              <i className="bi bi-x-lg" onClick={() => setOpen(!open)}></i>
            </>
          ) : (
            <>
              <i className="bi bi-list" onClick={() => setOpen(!open)}></i>
            </>
          )}
        </div>
        <ul className="flex gap-10 items-center">
          {navbar.map((value) => (
            <li key={value.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-300/50 px-4 py-2 rounded-full "
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
                onValueChange={(value) => {
                  if (value === "Sign Out") {
                    handleLogout();
                  } else if (value === "Profile") {
                    navigate("/user/profile")
                  }
                }}
              >
                <SelectTrigger className="">
                  <Avatar>
                    <AvatarImage src={image} />
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
    </>
  );
};

export default React.memo(Header);
