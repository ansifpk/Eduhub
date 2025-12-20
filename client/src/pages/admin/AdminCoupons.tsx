import useRequest from "../../hooks/useRequest";
import React, { useEffect, useState } from "react";
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
} from "../../components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import moment from "moment";
import adminRoutes from "../../service/endPoints/adminEndPoints";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  couponSchema,
  type CouponFormInputs,
} from "../../util/schemas/couponSchema";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
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
} from "../../components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import type { ICoupon } from "@/@types/couponType";
import { zodResolver } from "@hookform/resolvers/zod";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfim] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const { doRequest, err } = useRequest();
  const [debouns, setDebouns] = useState("");
  const [couponId, setCouponId] = useState("");
  const todaydate = new Date();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CouponFormInputs>({
    resolver: zodResolver(couponSchema),
  });

  useEffect(() => {
    doRequest({
      url: `${adminRoutes.coupon}?search=${search}&&sort=${sort}&&page=${page}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setCoupons(response.coupon[0].data);
        setTotalPage(response.coupon[0].totalPage);
      },
    });
  }, [search, sort, page]);

  useEffect(() => {
    const intervel = setTimeout(() => {
      setSearch(debouns);
    }, 600);
    return () => {
      clearTimeout(intervel);
    };
  }, [debouns]);

  const handleCoupon = async () => {
    setDeleteConfim(false);

    doRequest({
      url: `${adminRoutes.coupon}/${couponId}`,
      method: "delete",
      body: {},
      onSuccess: () => {
        doRequest({
          url: `${adminRoutes.coupon}?search=${search}&&sort=${sort}&&page=${page}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setCouponId("");
            setCoupons(response.coupon[0].data);
            setTotalPage(response.coupon[0].totalPage);
            return toast.success("Edited successfully");
          },
        });
      },
    });
  };

  const editCouponHandler = (data: CouponFormInputs) => {
    setLoading(true)
    doRequest({
      url: `${adminRoutes.coupon}/${couponId}`,
      body: {
        title: data.title,
        description: data.description,
        offer: data.offer,
        expiryDate: data.expiryDate,
        startingDate: data.startingDate,
        couponCode: data.couponCode,
      },
      method: "patch",
      onSuccess: () => {
        setEditOpen(false);
        doRequest({
          url: `${adminRoutes.coupon}?search=${search}&&sort=${sort}&&page=${page}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setCouponId("");
            setLoading(false)
            setCoupons(response.coupon[0].data);
            setTotalPage(response.coupon[0].totalPage);
            return toast.success("Edited successfully");
          },
        });
      },
    });
  };

  useEffect(() => {
    const intervel = setTimeout(() => {
      setSearch(debouns);
    }, 600);
    return () => {
      clearTimeout(intervel);
    };
  }, [debouns]);

  useEffect(() => {
    setLoading(false)
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
              <button
                className="bg-purple-600 px-2 text-white cursor-pointer rounded"
                onClick={() => navigate("/admin/createCoupon")}
              >
                create coupon
              </button>
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
                      {new Date(coupon.startingDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center ">
                      {new Date(coupon.expiryDate).toLocaleDateString()}
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setEditOpen(true);
                              setCouponId(coupon._id!);
                              setValue("description", coupon.description);
                              setValue("offer", coupon.offer.toString());
                              setValue("title", coupon.title);
                              setValue(
                                "startingDate",
                                new Date(coupon.startingDate)
                                  .toISOString()
                                  .slice(0, 16)
                              );
                              setValue(
                                "expiryDate",
                                new Date(coupon.expiryDate)
                                  .toISOString()
                                  .slice(0, 16)
                              );
                              setValue("couponCode", coupon.couponCode);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setDeleteConfim(true);
                              setCouponId(coupon._id!);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

          <Sheet
            open={editOpen}
            onOpenChange={() => {
              if (editOpen) {
                setCouponId("");
                setValue("description", "");
                setValue("offer", "");
                setValue("title", "");
                setValue("startingDate", "");
                setValue("expiryDate", "");
                setValue("couponCode", "");
              }
              setEditOpen(!editOpen);
            }}
          >
            <SheetContent side="bottom" className="h-screen">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
              <div className="w-[75%] mx-auto border grid grid-cols-2 p-2 gap-4">
                <div className="space-y-3">
                  <div className="grid grid-row ">
                    <label htmlFor="title">Title</label>
                    <input
                      {...register("title")}
                      type="text"
                      placeholder="enter title"
                      className="border-purple-600 rounded border p-2"
                    />
                    {errors.title && (
                      <p className="text-red-500">{errors.title.message}</p>
                    )}
                  </div>
                  <div className="grid grid-row">
                    <label htmlFor="Description">Description</label>
                    <input
                      {...register("description")}
                      type="textarea"
                      placeholder="enter decription"
                      className="border-purple-600 rounded border h-[150px] p-2"
                    />
                    {errors.description && (
                      <p className="text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-row">
                    <label htmlFor="Offer">Offer</label>
                    <input
                      {...register("offer")}
                      type="number"
                      placeholder="enter title"
                      className="border-purple-600 rounded border p-2"
                    />
                    {errors.offer && (
                      <p className="text-red-500">{errors.offer.message}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <div className="grid grid-row">
                      <label htmlFor="Starting Date">Starting Date</label>
                      <input
                        {...register("startingDate")}
                        type="datetime-local"
                        placeholder="enter decription"
                        className="border-purple-600 rounded border p-2"
                      />
                      {errors.startingDate && (
                        <p className="text-red-500">
                          {errors.startingDate.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-row">
                      <label htmlFor="Ending Date">Ending Date</label>
                      <input
                        {...register("expiryDate")}
                        type="datetime-local"
                        placeholder="enter decription"
                        className="border-purple-600 rounded border p-2"
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500">
                          {errors.expiryDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-row">
                    <label htmlFor="Coupon code">Coupon code</label>
                    <input
                      {...register("couponCode")}
                      type="text"
                      placeholder="enter Coupon code"
                      className="border-purple-600 rounded border p-2"
                    />
                    {errors.couponCode && (
                      <p className="text-red-500">
                        {errors.couponCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <SheetFooter className="border">
                <div className="flex gap-2 justify-end-safe">
                  <AlertDialog>
                    <AlertDialogTrigger disabled={loading} asChild>
                      <button
                        disabled={loading}
                        className="bg-purple-600 rounded cursor-pointer p-2 text-white font-bold"
                        type="button"
                      >
                        Save changes
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          save the data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-purple-600 text-white cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          type="submit"
                          onClick={() => handleSubmit(editCouponHandler)()}
                          className="bg-purple-600 text-white cursor-pointer hover:bg-purple-500 "
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <SheetClose asChild>
                    <button
                      type="button"
                      className="bg-purple-600 rounded  cursor-pointer p-2 text-white font-bold"
                    >
                      Close
                    </button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <AlertDialog
            open={deleteConfirm}
            onOpenChange={() => {
              if (deleteConfirm) {
                setCouponId("");
              }
              setDeleteConfim(!deleteConfirm);
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  coupon and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-purple-600 text-white cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-purple-600 text-white cursor-pointer"
                  onClick={handleCoupon}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminCoupons);
