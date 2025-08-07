import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import React, { useEffect, useState } from "react";
import InstructorChart from "@/components/intructor/InstructorChart";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
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

const InstructorDashboard = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const instructorId = useSelector((state: IUser) => state._id);
  // const [start,setStart] = useState("");
  // const [end,setEnd] = useState("");
  const { doRequest, err } = useRequest();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
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
  }, [instructorId]);

  const handleDate = (data: DateFormInputs) => {
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

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full p-2">
        <SidebarTrigger />
        <InstructorChart />
        <div className="space-y-5">
          <form
            onSubmit={handleSubmit(handleDate)}
            className="flex justify-between"
          >
            <div className="text-black">
              <h2 className="text-2xl font-bold tracking-tight underline">
                Sales report
              </h2>
              <p className="text-muted-foreground">
                Here is the list of sales
              </p>
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
              <button className="bg-black text-white p-2 rounded cursor-pointer">
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
