import AdminAside from "../../Components/admin/AdminAside";
import { useEffect, useState } from "react";
import { ICourse } from "@/@types/courseType";
import { IUser } from "@/@types/chatUser";
import AdminChart from "@/Components/admin/AdminChart";
import useRequest from "@/hooks/useRequest";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import toast from "react-hot-toast";

const AdminHome = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [topCourses, setTopCourses] = useState<ICourse[]>([]);
  const { doRequest, errors } = useRequest();


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
    errors?.map((err) => toast.error(err.message));
  }, [errors]);
  return (
    <div className="flex  gap-2">
      <AdminAside />
      <div className="w-full mr-3">
        <div className="w-full mx-auto mt-2 rounded-lg p-2  text-white bg-purple-600">
          <h1>Welcome back, Admin</h1>
        </div>
        {/* graph start */}
        <div className="w-full">
          <AdminChart />
        </div>
        {/* graph end */}

        <div className="row mx-1">
          <div className="col-md-4  my-2 border  rounded-lg shadow-lg">
            <p className="text-center font-bold">Top 5 Courses</p>
            <div>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <div
                    key={index}
                    className="mb-4  flex justify-between border-t"
                  >
                    <div>
                      <div className="font-medium text-sm text-black">
                        {course.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        students : {course.students?.length}
                      </div>
                    </div>
                    <div className="font-medium text-xs text-black">
                      Price {course.price}
                    </div>
                  </div>
                ))
              ) : (
                <p>No Courses Available</p>
              )}
            </div>
          </div>
          <div className="col-md-4 my-2 border  rounded-lg shadow-lg">
            <p className="text-center font-bold md:text-medium text-xs ">
              TOP RATED 5 INSTRUCTORS
            </p>
            <div>
              {users.length > 0 ? (
                users.map((review, index) => (
                  <div
                    key={index}
                    className="flex md:items-center gap-0 md:gap-3 mb-4 border-t"
                  >
                    <img
                      src={
                        review.avatar.avatar_url
                          ? review.avatar.avatar_url
                          : "https://github.com/shadcn.png"
                      }
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <div className="md:font-medium text-xs ">
                          {review.name}
                        </div>
                        <div className=" md:block hidden text-xs text-gray-500">
                          {review.email}
                        </div>
                        <div className="md:font-medium md:hidden  text-xs text-gray-500">
                          Ratings : {review.instructorReviews?.length}
                        </div>
                      </div>
                      <div className=" md:block hidden  text-xs text-gray-500">
                        Ratings: {review.instructorReviews?.length}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Instructors Available</p>
              )}
            </div>
          </div>
          <div className="col-md-4 my-2 border  rounded-lg shadow-lg">
            <p className="text-center font-bold md:text-medium text-xs ">
              TOP RATED 5 COURSES
            </p>
            <div>
              {topCourses.length > 0 ? (
                topCourses.map((course, index) => (
                  <div
                    key={index}
                    className="mb-4 last:mb-0 flex justify-between border-t"
                  >
                    <div>
                      <div className="font-medium text-sm">{course.title}</div>
                      <div className="text-xs text-gray-500">
                        Reviews : {course.courseReviews?.length}
                      </div>
                    </div>
                    <div className="font-medium text-xs">
                      Price {course.price}
                    </div>
                  </div>
                ))
              ) : (
                <p>No Courses Available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
