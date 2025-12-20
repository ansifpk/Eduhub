import Footer from "@/components/user/Footer";
import useRequest from "@/hooks/useRequest";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { IUser } from "@/@types/userType";
import userRoutes from "@/service/endPoints/userEndPoints";
import { loadStripe } from "@stripe/stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ICourse } from "@/@types/courseType";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const cartWithTwoCourses: any = {
  _id: "cart_003",
  userId: "user_003",
  courses: [
    {
      _id: "course_01",
      title: "React Basics",
      instructorId: {
        _id: "inst_01",
        name: "Alex Johnson",
        email: "alex@demo.com",
      },
      subCategory: "Frontend",
      description: "Learn React from scratch.",
      thumbnail: "https://example.com/react.png",
      category: "Web Development",
      level: "Beginner",
      isListed: true,
      price: 1499,
      test: {
        _id: "test_01",
        test: [],
        students: [],
      },
      subscription: true,
      image: {
        _id: "img_01",
        image_url: "https://example.com/react-course.jpg",
      },
      courseReviews: [],
      students: [],
      createdAt: "2024-01-12T08:00:00Z",
      sections: {
        _id: "sec_01",
        title: "Introduction",
      },
    },

    {
      _id: "course_02",
      title: "Node.js Essentials",
      instructorId: {
        _id: "inst_02",
        name: "Sarah Lee",
        email: "sarah@demo.com",
      },
      subCategory: "Backend",
      description: "Build backend apps with Node.js.",
      thumbnail: "https://example.com/node.png",
      category: "Backend Development",
      level: "Intermediate",
      isListed: true,
      price: 2499,
      test: {
        _id: "test_02",
        test: [],
        students: [],
      },
      subscription: false,
      image: {
        _id: "img_02",
        image_url: "https://example.com/node-course.jpg",
      },
      courseReviews: [],
      students: [],
      createdAt: "2024-02-18T10:30:00Z",
      sections: {
        _id: "sec_02",
        title: "Node Fundamentals",
      },
    },
    {
      _id: "course_03",
      title: "Node.js Essentials",
      instructorId: {
        _id: "inst_02",
        name: "Sarah Lee",
        email: "sarah@demo.com",
      },
      subCategory: "Backend",
      description: "Build backend apps with Node.js.",
      thumbnail: "https://example.com/node.png",
      category: "Backend Development",
      level: "Intermediate",
      isListed: true,
      price: 2499,
      test: {
        _id: "test_02",
        test: [],
        students: [],
      },
      subscription: false,
      image: {
        _id: "img_02",
        image_url: "https://example.com/node-course.jpg",
      },
      courseReviews: [],
      students: [],
      createdAt: "2024-02-18T10:30:00Z",
      sections: {
        _id: "sec_02",
        title: "Node Fundamentals",
      },
    },
    {
      _id: "course_04",
      title: "Node.js Essentials4",
      instructorId: {
        _id: "inst_02",
        name: "Sarah Lee",
        email: "sarah@demo.com",
      },
      subCategory: "Backend",
      description: "Build backend apps with Node.js.",
      thumbnail: "https://example.com/node.png",
      category: "Backend Development",
      level: "Intermediate",
      isListed: true,
      price: 2499,
      test: {
        _id: "test_02",
        test: [],
        students: [],
      },
      subscription: false,
      image: {
        _id: "img_02",
        image_url: "https://example.com/node-course.jpg",
      },
      courseReviews: [],
      students: [],
      createdAt: "2024-02-18T10:30:00Z",
      sections: {
        _id: "sec_02",
        title: "Node Fundamentals",
      },
    },
  ],
};
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { motion, AnimatePresence } from "motion/react";
import Header from "@/components/user/Header";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const Cart = () => {
  const [cart, setCart] = useState<any>();
  const [discount, setDiscount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const couponRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const userId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();

  // table
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo<ColumnDef<ICourse>[]>(
    () => [
      {
        header: "Product",
        accessorKey: "title",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Action",
        cell: ({ row }: any) => {
          return (
            <div
              className="cursor-pointer"
              onClick={() => handleCart(row.original._id)}
            >
              X
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    doRequest({
      url: `${userRoutes.Cart}/${userId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setCart(response.cart);
        setCartTotal(0);
      },
    });
  }, [userId]);

  const table = useReactTable({
    data: cart?.courses ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // table

  const handleCart = async (courseId: string) => {
    doRequest({
      url: `${userRoutes.addToCart}?courseId=${courseId}`,
      method: "post",
      body: { userId },
      onSuccess: (data) => {
        toast.success("item removed from your cart!");
        const total = data.cart.courses.reduce(
          (acc: number, cur: ICourse) => (acc += cur.price),
          0
        );
        setCart(data.cart);
        setCartTotal(total);
        return;
      },
    });
  };

  const applyCoupon = async () => {
    if (couponRef.current!.value.length == 0) {
      return toast.error("Please enter a coupon code!");
    }

    await doRequest({
      url: `${userRoutes.coupons}/${couponRef.current!.value}/${userId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setDiscount(Math.floor((cartTotal * response.coupons.offer) / 100));
        toast.success("Coupon applyied sucessfully");
      },
    });
  };

  const deleteCoupon = () => {
    toast.success("Coupon removed sucessfully");
    setDiscount(0);
    couponRef.current!.value = "";
  };

  const handleOrder = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_SECRET);
      await doRequest({
        url: userRoutes.stripePurchase,
        body: {
          course: cart?.courses!,
          userId,
          couponCode: discount > 0 ? couponRef.current!.value : "",
        },
        method: "post",
        onSuccess: async (data) => {
          await stripe?.redirectToCheckout({
            sessionId: data.id,
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div>
      <Header />
      {!cartWithTwoCourses || cartWithTwoCourses?.courses?.length == 0 ? (
        <div className="h-[75vh] flex justify-center items-center gap-5 ">
          <strong>No Item in Your Cart</strong>
          <button
            onClick={() => navigate("/user/courses")}
            className="text-indigo-700 cursor-pointer underline font-bold"
          >
            Go to course page
          </button>
        </div>
      ) : (
        <div>
          <div className="md:flex md:w-[70%]  w-full gap-5 mx-auto mt-5 justify-center-safe">
        
            {/* iteam area  */}
            <div className="w-full">
              <div className="flex items-center py-4">
                <Input
                  type="search"
                  placeholder="Search product..."
                  value={
                    (table.getColumn("title")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
              <div className="overflow-hidden rounded-md border">
                <Table className="w-full">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <AnimatePresence mode="sync">
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row) => (
                        <motion.tr
                          key={row.original._id.toString()}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: -100,
                            backgroundColor: "#fee2e2",
                            transition: { duration: 0.3 },
                          }}
                          transition={{
                            layout: { duration: 0.3 },
                          }}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-20"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            <p className="text-muted-foreground text-lg mb-4">
                              Cart is Empty!
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-teal-500 hover:bg-teal-300 cursor-pointer text-white px-6 py-2 rounded-lg"
                            >
                              Go to Products
                            </motion.button>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>

            {/* price area  */}

            <Card className="w-full max-w-xs rounded border-dashed mx-auto">
              <CardHeader>
                <CardTitle>Cart Total</CardTitle>
                <CardDescription>
                  <Separator className="my-5" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="flex w-full justify-between">
                      <span className="font-semibold">Discount :</span>
                      <span>{discount}</span>
                    </div>
                    <div>
                      <Separator />
                    </div>
                    <div className="flex w-full justify-between">
                      <span className="font-semibold">Sub Total : </span>
                      <span>{cartTotal}</span>
                    </div>
                    <div>
                      <Separator />
                    </div>
                    <div className="flex w-full justify-between">
                      <span className="font-semibold">Total</span>
                      <span>{cartTotal - discount}</span>
                    </div>
                    <div>
                      <Separator />
                    </div>
                    <div className="flex text-center items-center-safe justify-center-safe gap-2">
                      <Input
                        id="Coupon"
                        type="text"
                        placeholder="Enter Coupon code"
                        required
                      />
                      <Button
                        onClick={() =>
                          discount ? deleteCoupon() : applyCoupon()
                        }
                        className="bg-teal-500 font-semibold w-[25%] hover:bg-teal-300 rounded cursor-pointer  text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100"
                      >
                        {discount ? "Remove" : "Apply"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <button
                  onClick={handleOrder}
                  className="w-full font-semibold bg-teal-500 text-white p-2 text-sm rounded hover:bg-teal-300 cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100"
                >
                  Proceed to checkout
                </button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
