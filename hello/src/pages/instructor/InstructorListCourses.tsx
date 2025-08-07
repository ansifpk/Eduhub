import type { ICourse } from "@/@types/courseType";
import type { IUser } from "@/@types/userType";
import AppSidebar from "@/components/AppSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useRequest from "@/hooks/useRequest";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import moment from "moment";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import { MoreVertical, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { ISubcription } from "@/@types/subscriptionType";

const InstructorListCourses = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [courseId, setCourseId] = useState("");
  const [listAlert, setListAlert] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);
  const instructorId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();
  const navigate = useNavigate();
  useEffect(() => {
    doRequest({
      url: `${instructorRoutes.getCourses}?instructorId=${instructorId}&&search=${search}&&sort=${sort}&&page=${page}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setCourses(response.courses[0].data);
        setTotalPage(response.courses[0].totalPage);
      },
    });
    doRequest({
      url: `${instructorRoutes.subscribe}/${instructorId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setSubscriptions(response.plans);
      },
    });
  }, [instructorId, search, sort, page]);

  const checkSubscription = (course: ICourse) => {
    if (subscriptions.length > 0) {
      navigate(`/instructor/addTest/${course._id}`);
    } else {
      navigate("/instructor/purchaseSubscription");
    }
  };

  const handleListCourse = () => {
    doRequest({
      url: `${instructorRoutes.listCourses}/${courseId}`,
      method: "patch",
      body: {},
      onSuccess: async (res) => {
        doRequest({
          url: `${instructorRoutes.getCourses}?instructorId=${instructorId}&&search=${search}&&sort=${sort}&&page=${page}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setCourses(response.courses[0].data);
            if (res.course.isListed) {
              toast.success("Successfully Listed Course");
            } else {
              toast.success("Successfully UnListed Course");
            }
          },
        });
      },
    });
  };

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <div className="p-2  space-y-2">
          <div className="flex items-center-safe justify-between-safe">
            <div className="text-black">
              <h2 className="text-2xl font-bold tracking-tight underline">
                Courses
              </h2>
              <p className="text-muted-foreground">
                Here is the list of courses of your...
              </p>
            </div>
          </div>

          <div className="flex justify-end-safe ">
            <div className="text-white flex gap-2">
              <div>
                <input
                  type="search"
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="md:w-[100px]  lg:w-[300px] border border-black py-1 px-2 rounded  text-muted-foreground"
                />
              </div>
              <Select onValueChange={(value) => setSort(value)}>
                <SelectTrigger
                  id="framework"
                  className=" border-black w-[50px] lg:w-[150px] text-black"
                >
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Old">Old</SelectItem>
                  <SelectItem value="Name A-Z">Name A-Z</SelectItem>
                  <SelectItem value="Name Z-A">Name Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end-safe">
            <button
              type="button"
              onClick={() => navigate("/instructor/createCourse")}
              className=" flex items-center-safe gap-1 bg-black rounded text-white p-2 cursor-pointer "
            >
              create course <PlusCircle className="size-5" />
            </button>
          </div>
          <Table className="border-2 rounded-lg border-black">
            <TableCaption>
              {courses.length > 0 && (
                <Pagination>
                  <PaginationContent className="gap-10">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => {
                          if (page > 1) {
                            setPage((prev) => (prev -= 1));
                          }
                        }}
                        className={`text-black hover:bg-white ${
                          page > 1 ? "cursor-pointer" : ""
                        } `}
                        size={undefined}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        size={undefined}
                        className="text-black border border-black"
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
                        className={`text-black hover:bg-white ${
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
                <TableHead className="text-center">Image</TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length > 0 ? (
                courses?.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell className="flex  justify-center">
                      <Avatar>
                        <AvatarImage
                          src={course?.image.image_url}
                          alt="@shadcn"
                        />
                        <AvatarFallback>
                          <i className="bi bi-person-fill text-3xl"></i>
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-center">
                      {course?.title}
                    </TableCell>
                    <TableCell className="text-center">
                      {course?.price}
                    </TableCell>
                    <TableCell className="text-center">
                      {moment(new Date(course?.createdAt)).calendar()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`${
                          course?.isListed ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {course?.isListed ? "Listed" : "UnListed"}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex justify-center-safe ">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={()=>navigate(`/instructor/editCourse/${course._id}`)} >Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCourseId(course?._id);
                              setListAlert(true);
                            }}
                            className={`${
                              course.isListed
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {course?.isListed ? "UnList" : "List"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              {
                                course?.test?.length
                                  ? navigate(
                                      `/instructor/editTest/${course?.test[0]._id}`
                                    )
                                  : checkSubscription(course);
                              }
                            }}
                          >
                            {course?.test?.length ? "Edit Test" : "Add Test"}
                            <i className="bi bi-book-fill"></i>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <AlertDialog open={listAlert} onOpenChange={setListAlert}>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will hide this course from the users of
                              Eduhub
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              className="bg-purple-600 cursor-pointer text-white"
                              type="button"
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogCancel
                              className="bg-purple-600 cursor-pointer text-white"
                              type="button"
                              onClick={handleListCourse}
                            >
                              Continue
                            </AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={30} className="text-center font-bold">
                    No courses Found
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

export default React.memo(InstructorListCourses);
