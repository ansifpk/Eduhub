import useRequest from "@/hooks/useRequest";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import type { ICategory } from "@/@types/categoryType";
import { Loader2Icon, MoreHorizontal } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import {
  categorySchema,
  type CategoryFormInputs,
} from "@/util/schemas/categoryScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ICoupon } from "@/@types/couponType";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [couponId, setCouponId] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { doRequest, err } = useRequest();
  const [debouns, setDebouns] = useState("");
  const todaydate = new Date();

  useEffect(() => {
    doRequest({
      url: adminRoutes.coupon,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setCoupons(response.coupon);
      },
    });
  }, [search, sort]);

  const handleCoupon = async () => {
    doRequest({
      url: `${adminRoutes.coupon}/${couponId}`,
      method: "delete",
      body: {},
      onSuccess: () => {
        doRequest({
          url: adminRoutes.coupon,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setCoupons(response.coupon);
          },
        });
      },
    });
  };

  const editCouponHandler = () => {};

  useEffect(() => {
    const intervel = setTimeout(() => {
      setSearch(debouns);
    }, 600);
    return () => {
      clearTimeout(intervel);
    };
  }, [debouns]);

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);
  return (
    <div className="w-[80%] ml-auto">
      <div className="px-5 flex flex-col space-y-5">
        <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="font-bold text-3xl">Welcome back, Admin</span>
        </div>
        <div>
          <div className="flex justify-between my-3 ">
            <span className="text-lg font-bold underline">List Coupons</span>
            <div className="flex space-x-5">
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setDebouns(e.target.value)}
                className="md:w-[200px] border border-purple-600 p-1 rounded lg:w-[300px] "
              />
              <Select onValueChange={(value) => setSort(value)}>
                <SelectTrigger className="w-[100px] border border-purple-600">
                  <SelectValue placeholder="Sort..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort</SelectLabel>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Name Aa-Zz">Name Aa-Zz</SelectItem>
                    <SelectItem value="Name Zz-Aa">Name Zz-Aa</SelectItem>
                    <SelectItem value="Old">Old</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table className="border-2 table-auto rounded-lg border-purple-600">
            <TableCaption>
              {coupons.length > 0 && (
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
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Descriptoin</TableHead>
                <TableHead className="text-center">Offer</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">Starting Date</TableHead>
                <TableHead className="text-center">Expirying Date</TableHead>
                <TableHead className="text-center"> Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <TableRow key={coupon._id}>
                    <TableCell className="flex  justify-center">
                      {coupon.title}
                    </TableCell>
                    <TableCell className="text-start">
                      {coupon.description}
                    </TableCell>
                    <TableCell className="text-start">
                      {coupon.offer}%
                    </TableCell>
                    <TableCell className="text-center">
                      {moment(new Date(coupon.createdAt)).calendar()}
                    </TableCell>
                    <TableCell className="text-center ">
                      {coupon.startingDate}
                    </TableCell>
                    <TableCell className="text-center ">
                      {coupon.expiryDate}
                    </TableCell>
                    <TableCell className="text-center ">
                      <span
                        className={`rounded-full text-white font-bold px-2 ${
                          new Date(coupon.expiryDate) > todaydate
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {new Date(coupon.expiryDate) > todaydate
                          ? "active"
                          : "expired"}
                      </span>
                    </TableCell>
                    <TableCell className="flex justify-center-safe">
                      <MoreHorizontal />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={30} className="text-center font-bold">
                    No coupons found
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

export default React.memo(AdminCoupons);
