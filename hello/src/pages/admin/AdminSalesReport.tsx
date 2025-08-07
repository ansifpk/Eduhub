import useRequest from "@/hooks/useRequest";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { IOrder } from "@/@types/orderType";
import moment from "moment";
import adminRoutes from "@/service/endPoints/adminEndPoints";

const AdminSalesReport = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [startingDate, setStartingDate] = useState(
    moment(new Date("2020-01-01")).format("YYYY-MM-DD")
  );
  const [endingDate, setEndingingDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { doRequest, err } = useRequest();

  useEffect(() => {
    doRequest({
      url: `${adminRoutes.order}?end=${endingDate}&&start=${startingDate}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setOrders(response.orders);
      },
    });
  }, []);

  const handleFilter = () => {
    console.log(endingDate, startingDate);

    doRequest({
      url: `${adminRoutes.order}?end=${endingDate}&&start=${startingDate}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        console.log(response.orders);
        setOrders(response.orders);
      },
    });
  };
  
   const handleReport = async () => {
    // const response = await createReport(report, year, months.indexOf(month));
    // const blob = new Blob([response], {
    //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // });
    // const url = window.URL.createObjectURL(blob);
    // const anchor = document.createElement("a");
    // anchor.href = url;
    // anchor.click();
    // window.URL.revokeObjectURL(url);
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
        <div className="space-y-5">
          <div className="flex justify-between">
            <span className="text-3xl font-bold underline">Sales Reports</span>
            <div className="flex gap-2">
              <input
                type="date"
                value={startingDate}
                onChange={(value) => setStartingDate(value.target.value)}
                className="border-2 border-purple-600 p-2 rounded"
              />
              <input
                type="date"
                value={endingDate}
                onChange={(value) => setEndingingDate(value.target.value)}
                className="border-2 border-purple-600 p-2 rounded"
              />
              <button
                onClick={handleFilter}
                className="border-2 text-white cursor-pointer bg-purple-600 p-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
          <div className="space-x-5">
            <button className="text-white p-2 rounded bg-purple-600 cursor-pointer font-semibold">download report pdf </button>
            <button className="text-white p-2 rounded bg-purple-600 cursor-pointer font-semibold">download report xl </button>
          </div>
          <Table className="border-2 rounded-lg border-purple-600">
            <TableCaption>
              {orders.length > 0 && (
                <Pagination>
                  <PaginationContent className="gap-10">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => {
                          if (page > 1) {
                            setPage((prev) => (prev -= 1));
                          }
                        }}
                        className={`text-purple-600 hover:bg-white ${
                          page > 1 ? "cursor-pointer" : ""
                        } `}
                        size={undefined}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        size={undefined}
                        className="text-purple-600 border border-purple-600"
                        isActive
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        size={undefined}
                        onClick={() => {
                          if (page !== totalPage) {
                            setPage((prev) => (prev += 1));
                          }
                        }}
                        className={`text-purple-600 hover:bg-white ${
                          page < totalPage ? "cursor-pointer" : ""
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Customer Name</TableHead>
                <TableHead className="text-center">Product</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="text-center">
                      {order.user.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.course.title}
                    </TableCell>
                    <TableCell className="text-center">
                      {moment(new Date(order.createdAt)).calendar()}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.course.price}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={30} className="text-center font-bold">
                    No Orders Found
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

export default React.memo(AdminSalesReport);
