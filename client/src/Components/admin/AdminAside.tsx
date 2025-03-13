import { removeUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import useRequest from "@/hooks/useRequest";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
const arr = [
  {
    name: "Home",
    to: "/admin/home",
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
  {
    name: "Reports",
    to: "/admin/reports",
    icon: <i className="bi bi-file-earmark-arrow-down-fill"></i>,
  },
  { name: "Courses", to: "/admin/courses", icon: <i className="bi bi-tv"></i> },
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
    to: "/admin/messages",
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
  const { doRequest } = useRequest();
  const handleLogout = async () => {
    doRequest({
      url: adminRoutes.logout,
      method: "post",
      body: {},
      onSuccess: (response) => {
        dispatch(removeUser());
        return toast.success(response.message);
      },
    });
  };

  return (
    <aside className="bg-purple-600 w-[250px] h-screen lg:block md:block sm:hidden hidden h-sceen sticky top-0 left-0">
      <div className="flex justify-center">
        <div className="text-2xl font-bold text-white">
          <span className="inline-block transform">
            <div className="bg-white text-purple-600 p-2 rounded">EduHub</div>
          </span>
        </div>
      </div>
      <ul className="list-none mt-4 p-0 ">
        {arr.map((val, index) => (
          <li key={index}>
            <NavLink
              end
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: "ghost" }),
                  isActive
                    ? "bg-white hover:bg-white text-black w-75 no-underline"
                    : "hover:bg-transparent hover:underline text-white no-underline",
                  "justify-start mx-1"
                )
              }
              to={val.to}
            >
              {val.icon} {val.name}
            </NavLink>
          </li>
        ))}

        <li
          onClick={handleLogout}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hover:bg-transparent hover:underline text-white no-underline",
            "justify-start"
          )}
        >
          Log Out
        </li>
      </ul>
    </aside>
  );
};

export default AdminAside;
