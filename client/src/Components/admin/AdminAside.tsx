import useRequest from "@/hooks/useRequest";
import { removeUser } from "@/redux/authSlice";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
const arr = [
  {
    name: "Home",
    to: "",
    icon: <i className="bi bi-house-fill"></i>,
  },
  {
    name: "Students",
    to: "/admin/students",
    icon: <i className="bi bi-person-video"></i>,
  },
  {
    name: "Instructors",
    to: "/admin/instructors",
    icon: <i className="bi bi-person-video3"></i>,
  },
  { name: "courses", to: "courses", icon: <i className="bi bi-tv"></i> },
  {
    name: "Category",
    to: "/admin/category",
    icon: <i className="bi bi-inboxes-fill"></i>,
  },
  {
    name: "Coupons",
    to: "/admin/coupon",
    icon: <i className="bi bi-ticket-perforated"></i>,
  },
  {
    name: "Messages",
    to: "/admin/mesage",
    icon: <i className="bi bi-chat-left-dots"></i>,
  },
  {
    name: "Subscription",
    to: "/admin/subscriptions",
    icon: <i className="bi bi-bell-fill"></i>,
  },
];

const AdminAside = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { doRequest } = useRequest();
  const handleLogout = async () => {
    
    doRequest({
      url: adminRoutes.logout,
      method: "post",
      body: {},
      onSuccess: (response) => {
        dispatch(removeUser());
        navigate("/admin/login")
        return toast.success(response.message);
      },
    });
  };

  return (
    <>
      <aside className="h-screen fixed top-0 bg-purple-800 w-[20%] shadow-lg">
          <div className="text-center">
              <span className="font-extrabold text-5xl text-white ">EduHub</span>
          </div>
          <ul className="flex mt-5 flex-col font-semibold text-white text-center space-y-4 mx-3">
              {arr.map((val) => (
                  <div key={val.name}>
                      <NavLink
                          end
                          className={({ isActive }) => `flex w-full gap-2 justify-center-safe ${isActive ? "bg-white text-black rounded py-1" : "text-white"}`}
                          to={val.to}
                      >
                          <span>{val.icon}</span>
                          <span>{val.name}</span>
                      </NavLink>
                  </div>
              ))}
              <li className="cursor-pointer" onClick={handleLogout}>Log Out</li>
          </ul>
      </aside>
      <Outlet/>
      </>
  );
};

export default AdminAside;
