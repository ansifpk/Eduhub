import {  Link, NavLink,  useNavigate } from "react-router-dom";
import "./ProfileNavbar.css";
// import { logout } from '@/Api/user';
import { logout } from "../../Api/user";
// import { removeUser } from '@/redux/authSlice';
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
  
  return (
    <div className="">
       <div className='profile-navbar'>
              <ul className="px-2">
                <li ><NavLink end  className={({ isActive }) =>
                isActive
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline"
                  : "no-underline text-white"
              } to={'/profile'}>Profile</NavLink></li>
               
                <li ><NavLink  end className={({ isActive }) =>
                isActive

                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline"
                  : "no-underline text-white"
              } to={'/profile/courses'}>Courses</NavLink></li>
                <li><NavLink end  className={({ isActive }) =>
                isActive
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline"
                  : "no-underline text-white"
              } to={'/profile/message'}>Messages</NavLink></li>
                <li><NavLink end  className={({ isActive }) =>
                isActive
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline"
                  : "no-underline text-white"
              } to={'/profile/coupons'}>Coupons</NavLink></li>
                <li><NavLink end  className={({ isActive }) =>
                isActive
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline"
                  : "no-underline text-white"
              } to={'/profile/Plans'}>Plans</NavLink></li>
               <li ><NavLink end  className={({ isActive }) =>
                isActive
                  ? "text-black px-4 py-1 rounded-full bg-gray-100  no-underline"
                  : "no-underline text-white"
              } to={'/user/settings'}>settings</NavLink></li>
                <li  ><AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Link to={""} >Log Out</Link>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure to log out from EduHub?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction className='rounded-full bg-[#49BBBD]' type='button'  >Cancel</AlertDialogAction>
                        <AlertDialogAction className='rounded-full bg-[#49BBBD]'  type='button' onClick={handleLogout} >Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog></li>
                
              </ul>

       </div>
    </div>
  //  <div className="flex justify-center mt-4" >
  //    <div className="flex flex-col gap-2 bg-teal-500 rounded-full">
  //     <Tabs
  //       variant="light"
  //       selectedKey={selected}
  //       aria-label="Options"
  //       radius="full"
  //       onSelectionChange={(val) => setSelected(val.toString())}
        
  //     >
  //       <Tab 
  //         key={"profile"}
  //         id="profile"
  //         title={<NavLink end className={({ isActive }) =>
  //           isActive
  //             ? "no-underline text-black"
  //             : "no-underline text-white"
  //         } to="/profile">profile</NavLink>}
  //         />
  //       <Tab
  //         id="courses"
  //         key={"courses"}
  //         title={<NavLink  className={({ isActive }) =>
  //           isActive
  //             ? "no-underline text-black"
  //             : "no-underline text-white"
  //         } to="/profile/courses">courses</NavLink>}
  //       />
  //       <Tab
  //         id="message"
  //         key={"message"}
  //         title={<NavLink end className={({ isActive }) =>
  //           isActive
  //             ? "no-underline text-black"
  //             : "no-underline text-white"
  //         } to="/profile/message">message</NavLink>}
  //       />
  //       <Tab
  //         id="coupons"
  //         key={"coupons"}
  //         title={<NavLink end className={({ isActive }) =>
  //           isActive
  //             ? "no-underline text-black"
  //             : "no-underline text-white"
  //         } to="/profile/coupons">coupons</NavLink>}
  //       />
  //     </Tabs>
  //   </div>
  //  </div>
  );
};

export default ProfileNavbar;
