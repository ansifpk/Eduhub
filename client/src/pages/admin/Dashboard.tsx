import React, { useEffect, useState } from "react";
import type { ICourse } from "@/@types/courseType";
import type { IOrder } from "@/@types/orderType";
import type { IUserProfile } from "@/@types/userProfile";
import { createReport } from "@/Api/adminApi";
const AdminChart = React.lazy(()=>import("@/components/admin/AdminChart"));
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useRequest from "@/hooks/useRequest";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import { dateRangeScheema, type DateFormInputs } from "@/util/schemas/dateRangeScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


export const description = "An interactive area chart";


const Dashboard = () => {
  const [users,setUsers] = useState<IUserProfile[]>([]);
  const [courses,setCourses] = useState<ICourse[]>([]);
  const [topCourses,setTopCourses] = useState<ICourse[]>([])
  const [orders, setOrders] = useState<IOrder[]>([]);

  const { doRequest, err } = useRequest();

    const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm<DateFormInputs>({
      resolver: zodResolver(dateRangeScheema),
    });

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
    doRequest({
        url: `${
          adminRoutes.order
        }?start=${watch("start")}&&end=${watch(
          "end"
        )}`,
        body: {},
        method: "get",
        onSuccess: (res) => {
          setOrders(res.orders);
        },
      });
  }, []);

    const handleDate = (data: DateFormInputs) => {
      console.log(data);
      doRequest({
        url: `${
          adminRoutes.order
        }?start=${watch("start")}&&end=${watch(
          "end"
        )}`,
        body: {},
        method: "get",
        onSuccess: (res) => {
          setOrders(res.orders);
        },
      });
    };
  
    const handleReportDownload = async() => {
      const start = watch("start");
      const end = watch("end");
      const res = await createReport(start,end);
          const blob = new Blob([res], {
            type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.click();
          window.URL.revokeObjectURL(url);
     
    };

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

         <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
            <div className="border rounded-lg">
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
            <div className="border rounded-lg">
                <p className="text-center font-bold">
                  TOP RATED 5 INSTRUCTORS
                </p>
                <div>
                  {users.length > 0 ? (
                    users.map((review, index) => (
                      <div
                        key={index}
                        className="flex md:items-center gap-0 md:gap-3 mb-4 border-t"
                      >
                        {
                          review.avatar.avatar_url?
                          <img
                          src={
                            review.avatar.avatar_url
                          }
                          className="w-8 h-8 rounded-full"
                        />
                          :
                         <i className="bi bi-person-circle text-2xl"></i>
                        }
                       
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
            <div className="border rounded-lg">
            <p className="text-center font-bold">
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

        <div className="space-y-5">
          <form
            onSubmit={handleSubmit(handleDate)}
            className="flex justify-between"
          >
            <div className="text-black">
              <h2 className="text-2xl font-bold tracking-tight underline">
                Sales report
              </h2>
              <p className="text-muted-foreground">Here is the list of sales</p>
            </div>
            <div className="flex gap-5 items-end-safe">
              <div className="grid grid-cols-1 space-y-2 font-semibold">
                <label htmlFor="">Starting date</label>
                <input
                  {...register("start")}
                  className="border border-black p-2 rounded"
                  type="date"
                />
                {errors.start && (
                  <span className="text-red-500 text-xs">
                    {errors.start.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 space-y-2 font-semibold">
                <label htmlFor="">Ending date</label>
                <input
                  {...register("end")}
                  className="border border-black rounded p-2"
                  type="date"
                />
                {errors.end && (
                  <span className="text-red-500 text-xs">
                    {errors.end.message}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleSubmit(handleDate)()}
                className="bg-black rounded px-2 text-white py-2 cursor-pointer"
              >
                save
              </button>
            </div>
          </form>
          <div className="flex justify-end-safe ">
            {orders.length > 0 && (
              <button
                onClick={handleReportDownload}
                className="bg-black text-white p-2 rounded cursor-pointer"
              >
                Download report <i className="bi bi-printer-fill"></i>
              </button>
            )}
          </div>
          <Table className="border rounded border-black">
            <TableHeader>
              <TableRow>
                <TableHead className="">Order Id</TableHead>
                <TableHead className="">Customer Name</TableHead>
                <TableHead className="">Product</TableHead>
                <TableHead className="">Date</TableHead>
                <TableHead className="">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((value, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium ">{value._id}</TableCell>
                    <TableCell className="font-medium ">
                      {value.user.name}
                    </TableCell>
                    <TableCell className="">{value.course.title}</TableCell>
                    <TableCell className="">
                      {moment(value.createdAt).calendar()}
                    </TableCell>
                    <TableCell className="">{value.course.price}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={20}
                    className="font-medium "
                  >
                    No Orders made in this period
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
