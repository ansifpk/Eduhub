import type { ICourse } from "@/@types/courseType";
import type { IUser } from "@/@types/userType";
import AdminChart from "@/components/admin/AdminChart";
import useRequest from "@/hooks/useRequest";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


export const description = "An interactive area chart";


const Dashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [topCourses, setTopCourses] = useState<ICourse[]>([]);
  const { doRequest, err } = useRequest();

  useEffect(() => {
    doRequest({
      url: adminRoutes.course,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setCourses(response);
      },
    });
    doRequest({
      url: adminRoutes.top5Instructors,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setUsers(response);
      },
    });
    doRequest({
      url: adminRoutes.top5RatedCourse,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setTopCourses(response);
      },
    });
  }, []);

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div className="w-[80%] ml-auto">
      <div className="px-5 flex flex-col space-y-5">
        <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="font-bold text-3xl">Welcome back, Admin</span>
        </div>

        <AdminChart />

        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
