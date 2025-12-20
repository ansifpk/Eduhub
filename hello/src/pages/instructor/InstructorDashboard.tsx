import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import AppSidebar from "../../components/AppSidebar";
import React, { useEffect, useState } from "react";
import InstructorChart from "../../components/intructor/InstructorChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import moment from "moment";
import type { IOrder } from "@/@types/orderType";
import { useSelector } from "react-redux";
import type { IUser } from "@/@types/userType";
import useRequest from "@/hooks/useRequest";
import toast from "react-hot-toast";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import { useForm } from "react-hook-form";
import {
  dateRangeScheema,
  type DateFormInputs,
} from "@/util/schemas/dateRangeScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ICourse } from "@/@types/courseType";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import type { IRating } from "@/@types/ratingType";
import type { IInstructorRating } from "@/@types/instructorRatingType";
import { createReport } from "@/Api/instructorAPi";

const InstructorDashboard = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [top5Courses, setTop5Courses] = useState<ICourse[]>([]);
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [instructorRatings, setInstructorRatings] = useState<
    IInstructorRating[]
  >([]);
  const instructorId = useSelector((state: IUser) => state._id);
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
      url: `${
        instructorRoutes.order
      }?instructorId=${instructorId}&&start=${watch("start")}&&end=${watch(
        "end"
      )}`,
      body: {},
      method: "get",
      onSuccess: (res) => {
        setOrders(res.orders);
      },
    });
    doRequest({
      url: `${instructorRoutes.top5Courses}/${instructorId}`,
      body: {},
      method: "get",
      onSuccess: (res) => {
        setTop5Courses(res.courses);
      },
    });
    doRequest({
      url: `${instructorRoutes.top5RatedCourses}/${instructorId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setRatings(response.ratings);
      },
    });
    doRequest({
      url: `${instructorRoutes.ratings}/${instructorId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setInstructorRatings(response.ratings);
      },
    });
  }, [instructorId]);

  const handleDate = (_data: DateFormInputs) => {
    doRequest({
      url: `${
        instructorRoutes.order
      }?instructorId=${instructorId}&&start=${watch("start")}&&end=${watch(
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
    const res = await createReport(instructorId,start,end);
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
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full p-2">
        <SidebarTrigger />
        <InstructorChart />
        <div className="grid grid-cols-3 gap-2 my-5">
          <div className="border rounded border-black p-2 space-y-1">
            <strong className="text-center">Your Top 5 Courses</strong>
            {top5Courses.length > 0 ? (
              top5Courses.map((course) => (
                <div
                  key={course._id}
                  className="flex items-center-safe gap-2 border rounded p-2 font-semibold"
                >
                  <Avatar>
                    <AvatarImage
                      src={course.image.image_url}
                      alt="@courseImage"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{course.title}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center-safe text-center gap-2 border justify-center-safe rounded p-2 font-semibold">
                <strong className="text-center">No Courses</strong>
              </div>
            )}
          </div>
          <div className="border rounded border-black p-2 space-y-1">
            <strong className="text-center">Your Top 5 Rated Courses</strong>
            {ratings.length > 0 ? (
              ratings.map((rating) => (
                <div
                  key={rating._id}
                  className="flex items-center-safe gap-2 border rounded p-2 font-semibold"
                >
                  <Avatar>
                    <AvatarImage
                      src={rating.userId.avatar.avatar_url}
                      alt="userImage"
                    />
                    <AvatarFallback>
                      <i className="bi bi-person-circle text-3xl"></i>
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid grid-rows-1">
                    <span className="text-sm">{rating.userId.name}</span>
                    <span className="text-xs">
                      {rating.stars}{" "}
                      <i className="bi bi-star-fill text-orange-500"></i>
                    </span>
                    <span className="text-xs">{rating.review}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center-safe text-center gap-2 border justify-center-safe rounded p-2 font-semibold">
                <strong className="text-center">No Ratings</strong>
              </div>
            )}
          </div>
          <div className="border rounded border-black p-2 space-y-1">
            <strong className="text-center">Your Top 5 Ratings</strong>
            {instructorRatings.length > 0 ? (
              instructorRatings.map((instructorRating) => (
                <div
                  key={instructorRating._id}
                  className="flex items-center-safe gap-2 border rounded p-2 font-semibold"
                >
                  <Avatar>
                    <AvatarImage
                      src={instructorRating.userId.avatar.avatar_url}
                      alt="userImage"
                    />
                    <AvatarFallback>
                      <i className="bi bi-person-circle text-3xl"></i>
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid grid-rows-1">
                    <span className="text-sm">
                      {instructorRating.userId.name}
                    </span>
                    <span className="text-xs">
                      {instructorRating.stars}{" "}
                      <i className="bi bi-star-fill text-orange-500"></i>
                    </span>
                    <span className="text-xs">{instructorRating.review}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center-safe text-center gap-2 border justify-center-safe rounded p-2 font-semibold">
                <strong className="text-center">No Ratings</strong>
              </div>
            )}
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
    </SidebarProvider>
  );
};

export default React.memo(InstructorDashboard);
