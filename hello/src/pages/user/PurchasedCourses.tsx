import type { ICourse } from "@/@types/courseType";
import type { IUser } from "@/@types/userType";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";
import ProfileNavbar from "../../components/user/ProfileNavbar";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PurchasedCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const navigate = useNavigate();
  const { doRequest, err } = useRequest();
  const userId = useSelector((state: IUser) => state._id);

  useEffect(() => {
    doRequest({
      url: `${userRoutes.puchasedCourses}/${userId}`,
      method: "get",
      body: {},
      onSuccess: (res) => {
        setCourses(res.course);
      },
    });
  }, [userId]);

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div>
      <Header />
      <div className="w-full">
        <ProfileNavbar value="Courses" />
        <main className="w-full flex justify-center items-center md:p-8 p-2">
          {courses.length > 0 ? (
            <div className=" w-[80%] grid md:grid-cols-4 grid-cols-2 md:mx-5 mx-2 md:mt-4 gap-2 md:gap-3 ">
              {courses.map((course) => (
                <div
                  className={"border shadow-lg overflow-hidden "}
                  key={course._id}
                >
                  <div className=" overflow-hidden border rounded-md m-1">
                    <img
                      src={course.image.image_url}
                      alt={course.title}
                      width={150}
                      height={150}
                      className={
                        "h-[150px] w-full object-fill transition-all hover:scale-105 aspect-square"
                      }
                    />
                  </div>
                  <div className=" text-sm m-2 ">
                    <div className="flex flex-wrap ">
                      <h6 className="font-medium leading-none  break-words md:text-sm text-xs">
                        {course.title}
                      </h6>
                    </div>
                    <p className="font-medium text-xs text-muted-foreground">
                      Created : {course.instructorId.name} <br />
                      Price: {course.price}
                    </p>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/user/playCourse/${course._id}`)
                        }
                        className="bg-teal-500 text-xs transition-all hover:scale-105 rounded py-1 font-semibold cursor-pointer  w-full text-white hover:bg-teal-300"
                      >
                        Go To Class
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/user/courseDetailes/${course._id}`)
                        }
                        className="bg-teal-500 text-xs transition-all hover:scale-105 rounded  py-1 font-semibold cursor-pointer  w-full text-white hover:bg-teal-300"
                      >
                        View Detailes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[60vh] flex justify-center items-center gap-5 ">
              <strong>No course purchased yet</strong>
              <button
                onClick={() => navigate("/user/courses")}
                className="text-indigo-700 cursor-pointer underline font-bold"
              >
                Purchase course
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedCourses;
