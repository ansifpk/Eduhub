import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import userRoutes from "@/service/endPoints/userEndPoints";
import useRequest from "@/hooks/useRequest";
import { changeImage, removeUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { IUser } from "@/@types/userType";
import StarBorder from "../StarBorder";

const Header = () => {
  const [open, setOpen] = useState(false);
  const userId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const image = useSelector((state: { [key: string]: string }) => state.image);

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
          dispatch(changeImage(res.userData.avatar.avatar_url));
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
      <div className=" flex  justify-between items-center  bg-gray-10/50  font-mono text-black text-sm ">
        <span className="font-bold text-2xl flex items-center font-[poppins] text-gray-800">
          EduHub
        </span>
        <div className="flex md:hidden sticky top-0 lg:hidden sm:hidden cursor-pointer items-center">
          {open ? (
            <i
              className="bi bi-x-lg text-2xl"
              onClick={() => setOpen(!open)}
            ></i>
          ) : (
            <i
              className="bi bi-list text-2xl"
              onClick={() => setOpen(!open)}
            ></i>
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
          <Select>
      <SelectTrigger  className="w-[120px]">
        <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback>
                      <i className="bi bi-person-circle"></i>
                    </AvatarFallback>
                  </Avatar>
      </SelectTrigger>
      <SelectContent side="bottom">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem className="cursor-pointer" value="Profile">
                    Profile
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Sign Out">
                    Sign Out
                  </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
          {/* {userId ? ( */}
              <Select
                onValueChange={(value) => {
                  if (value === "Sign Out") {
                    handleLogout();
                  } else if (value === "Profile") {
                    navigate("/user/profile");
                  }
                }}
              >
                <SelectTrigger >
                  <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback>
                      <i className="bi bi-person-circle"></i>
                    </AvatarFallback>
                  </Avatar>
                </SelectTrigger>
                <SelectContent side="bottom" >
                  <SelectItem className="cursor-pointer" value="Profile">
                    Profile
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Sign Out">
                    Sign Out
                  </SelectItem>
                </SelectContent>
              </Select>
          {/* // ) : (
          //   <>
          //     <StarBorder as="button" thickness={3} color="red" speed="2s">
          //       <NavLink to={"/signIn"}>Sign In</NavLink>
          //     </StarBorder>
          //     <StarBorder as="button" thickness={3} color="red" speed="2s">
          //       <NavLink to={"/signUp"}>Sign Up</NavLink>
          //     </StarBorder>
          //   </>
          // )} */}
        </ul>
      </div>
      {open && (
          <ul
           
            className={`md:hidden flex w-full   flex-col bg-gray-10/50 backdrop-blur-lg fixed top-14 right-0 z-50 text-black items-end gap-5 p-2`}
          >
            {navbar.map((value) => (
              <li key={value.path}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-300/50 p-2 rounded-full text-sm font-semibold"
                      : "hover:bg-gray-300/50 p-2 rounded-full text-sm font-semibold"
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
                      navigate("/user/profile");
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
                    <SelectItem className="cursor-pointer" value="Profile">
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
                <StarBorder as="button" thickness={3} color="red" speed="2s">
                  <NavLink className="text-sm font-semibold" to={"/signIn"}>
                    Sign In
                  </NavLink>
                </StarBorder>
                <StarBorder as="button" thickness={3} color="red" speed="2s">
                  <NavLink className="text-sm font-semibold" to={"/signUp"}>
                    Sign Up
                  </NavLink>
                </StarBorder>
              </>
            )}
          </ul>
      )}
    </>
  );
};

export default React.memo(Header);
