import React, { useEffect, useState } from "react";
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
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { ICourse } from "@/@types/courseType";
import moment from "moment";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import useRequest from "@/hooks/useRequest";
import type { IReport } from "@/@types/report";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import toast from "react-hot-toast";
import type { IUser } from "@/@types/userType";
import { MoreHorizontal } from "lucide-react";

const AdminListCourses = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [reports, setReports] = useState<IReport[]>([]);
  const [courseReports, setCoureReports] = useState<IReport[]>([]);
  const [students, setStudents] = useState<IUser[]>([]);
  const [video, setVideo] = useState("");
  const [deleteConfim, setDeleteConfim] = useState(false);

  const { doRequest, err } = useRequest();

  useEffect(() => {
    doRequest({
      url: `${adminRoutes.getCourses}?search=${search}&&sort=${sort}&&page=${page}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setCourses(response.courses);
        setTotalPage(response.pages);
        doRequest({
          url: adminRoutes.report,
          method: "get",
          body: {},
          onSuccess: (repo) => {
            setReports(repo);
          },
        });
      },
    });
  }, [search, sort, page]);

  const handleDelete = async (url: string) => {
  
    doRequest({
      url: adminRoutes.course,
      method:"patch",
      body:{lectureUrl:url},
      onSuccess:()=>{
        doRequest({
          url:adminRoutes.report,
          method:"get",
          body:{},
          onSuccess:(repo)=>{
            setReports(repo);
             toast.success("deleted successfully");
          }
        })
      }
    });
  };

  useEffect(()=>{
    err?.map((err)=>toast.error(err.message));
  },[err]);
 
  return (
    <div className="w-[80%] ml-auto">
      <div className="px-5 flex flex-col space-y-5">
        <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="font-bold text-3xl">Welcome back, Admin</span>
        </div>

        <div>
          <div className="flex justify-between my-3 ">
            <span className="text-lg font-bold underline">List Courses</span>
            <div className="flex space-x-5">
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
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

          <Table className="border-2 table-fixed rounded-lg border-purple-600">
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
                <TableHead className="text-center">Image</TableHead>
                <TableHead className="text-center"> Name</TableHead>
                <TableHead className="text-center">Thumbnail</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">Reports</TableHead>
                <TableHead className="text-center">Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell className="flex  justify-center">
                      <Avatar>
                        <AvatarImage
                          src={course.image.image_url}
                          alt="@shadcn"
                        />
                        <AvatarFallback>ch</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-center">
                      {course.title}
                    </TableCell>
                      <TableCell className=" overflow-hidden text-ellipsis">
                         {course.instructorId.name}
                      </TableCell>
                    <TableCell className="text-center">
                      {moment(new Date(course.createdAt)).calendar()}
                    </TableCell>
                    <TableCell className="text-center ">
                      <Sheet
                        onOpenChange={() => {
                          if (video) {
                            setVideo("");
                          }
                        }}
                      >
                        <SheetTrigger asChild>
                          <button
                            type="button"
                            onClick={() => {
                              setCoureReports(
                                reports.filter(
                                  (report) => report.courseId._id == course._id
                                )
                              );
                            }}
                            className="relative cursor-pointer bg-purple-600 rounded px-2 py-1 text-white"
                          >
                            view
                            <span className="absolute -top-3 -right-1 size-14 text-white bg-purple-600 w-5 h-auto rounded-full">
                              {" "}
                              {(() => {
                                let c = 0;
                                reports.forEach((val) => {
                                  if (val.courseId._id == course._id) {
                                    c++;
                                  }
                                });
                                return `${c}`;
                              })()}{" "}
                            </span>
                          </button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-screen">
                          <SheetHeader>
                            <SheetTitle> Report Lists.</SheetTitle>
                            <SheetDescription></SheetDescription>
                          </SheetHeader>
                          {video ? (
                            <div className="flex justify-center gap-2">
                              <div>
                                <button
                                  className="bg-purple-600 cursor-pointer text-white rounded py-2 px-2 font-bold"
                                  onClick={() => setVideo("")}
                                >
                                  back
                                </button>
                              </div>
                              <video
                                className="w-[80%]"
                                src={`${video}`}
                                autoPlay={true}
                                controls
                                muted={false}
                                controlsList="nodownload"
                              />
                            </div>
                          ) : (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[100px]">
                                    Image
                                  </TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Reason</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {courseReports?.length! > 0 ? (
                                  courseReports.map((report) => (
                                    <TableRow key={report._id}>
                                      <TableCell className="font-medium">
                                        <img
                                          src={report.courseId.image.image_url}
                                          alt="Profile Picture"
                                          className="profile-pic"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        {report.courseId.title}
                                      </TableCell>
                                      <TableCell>{report.report}</TableCell>
                                      <TableCell className="">
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <MoreHorizontal className="h-4 w-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                              <DropdownMenuLabel>
                                                Actions
                                              </DropdownMenuLabel>
                                              <DropdownMenuSeparator />
                                              <DropdownMenuItem
                                                onClick={() =>
                                                  setVideo(report.content)
                                                }
                                              >
                                                Play
                                              </DropdownMenuItem>
                                              <DropdownMenuItem
                                                onClick={() =>
                                                  setDeleteConfim(true)
                                                }
                                              >
                                                Delete
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        <AlertDialog
                                          open={deleteConfim}
                                          onOpenChange={setDeleteConfim}
                                        >
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>
                                                Are you absolutely sure?
                                              </AlertDialogTitle>
                                              <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete
                                                This video from our servers.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel className="bg-purple-600 text-white cursor-pointer" >
                                                Cancel
                                              </AlertDialogCancel>
                                              <AlertDialogAction
                                                className="bg-purple-600 text-white cursor-pointer hover:bg-white hover:text-black"
                                                onClick={() =>
                                                  handleDelete(report.content)
                                                }
                                              >
                                                Continue
                                              </AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell>
                                      no reports available for this course
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          )}
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                    <TableCell align="center">
                      <Sheet>
                        <SheetTrigger asChild>
                          <button
                            onClick={() => {
                              setStudents(course?.students!);
                            }}
                            className="cursor-pointer bg-purple-600 rounded px-2 py-1 text-white"
                          >
                            View
                          </button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-screen">
                          <SheetHeader>
                            <SheetTitle>Students Lists.</SheetTitle>
                            <SheetDescription></SheetDescription>
                          </SheetHeader>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[100px] ">
                                  Image
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>email</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {students?.length! > 0 ? (
                                students?.map((student) => (
                                  <TableRow key={student._id}>
                                    <TableCell className="font-medium">
                                      {student.avatar.avatar_url ? (
                                        <img
                                          src={student.avatar.avatar_url}
                                          alt="Profile Picture"
                                          className="profile-pic w-20"
                                        />
                                      ) : (
                                        <i className="bi bi-person-circle text-3xl"></i>
                                      )}
                                    </TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell>
                                    no students purchased this course
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={30} className="text-center font-bold">
                    No Courses Found
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

export default React.memo(AdminListCourses);
