import AdminAside from "../../components/admin/AdminAside";
import { Card } from "../../components/ui/card";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { ICourse } from "../../@types/courseType";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";

import { IUser } from "../../@types/chatUser";
import { IReport } from "../../@types/report";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import useRequest from "../../hooks/useRequest";
import adminRoutes from "../../service/endPoints/adminEndPoints";

const AdminListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [video, setVideo] = useState("");
  const [sort, setSort] = useState("");
  const [reports, setReports] = useState<IReport[]>([]);
  const [id, setId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { doRequest,errors } = useRequest();


  useEffect(() => {
    doRequest({
      url:`${adminRoutes.getCourses}?search=${search}&&sort=${sort}&&page=${page}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        setCourses(response.courses);
        setTotalPage(response.pages);
        doRequest({
          url:adminRoutes.report,
          method:"get",
          body:{},
          onSuccess:(repo)=>{
            setReports(repo);
          }
        })
      }
    })
  }, [search, sort, page]);
 
   useEffect(()=>{
    errors?.map((err)=>toast.error(err.message))
   },[errors]);

  const viewReports = (course: ICourse) => {
    setId(course._id);
  };

  const handlePlay = (url: string) => {
    setVideo(url);
  };

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

  return (
    <div className="flex gap-2">
      <AdminAside />
      <div className="w-full mr-3">
      <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="text-3xl">Welcome back, Admin</span>
        </div>

        <div className="flex justify-between my-3 ">
          <h1 className="text-lg font-bold">Courses</h1>
          <div className="flex">
            <Input
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              className="md:w-[100px] lg:w-[300px] "
            />
            <Select onValueChange={(value:string) => setSort(value)}>
              <SelectTrigger>
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
        {/* card start */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs ">Image</TableHead>
                <TableHead className="text-xs"> Name</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead className="text-center">Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length > 0 ? (
                courses.map((value: ICourse, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <img
                        src={value.image.image_url}
                        alt="Profile Picture"
                        className="profile-pic w-20"
                      />
                    </TableCell>
                    <TableCell className="text-xs">{value.title}</TableCell>
                    <TableCell className="text-xs">{value.thumbnail}</TableCell>
                    <TableCell className="text-xs">
                      {moment(value.createdAt).calendar()}
                    </TableCell>
                    <TableCell className="text-xs">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            size={"sm"}
                            onClick={() => {
                              viewReports(value);
                            }}
                            className="bg-light text-xs text-black rounded-full border-1 border-black"
                          >
                            {(() => {
                              let c = 0;
                              reports.forEach((val) => {
                                if (val.courseId._id === value._id) {
                                  c++;
                                }
                              });
                              return `View ${c}`;
                            })()}
                          </Button>
                        </SheetTrigger>
                        <SheetContent side={"bottom"} className="h-screen">
                          <SheetHeader>
                            <SheetTitle> Report Lists.</SheetTitle>
                            <SheetDescription></SheetDescription>
                          </SheetHeader>
                          {video ? (
                            <video
                              src={`${video}`}
                              autoPlay={true}
                              controls
                              muted={false}
                              controlsList="nodownload"
                            />
                          ) : (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[100px] ">
                                    Image
                                  </TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Reason</TableHead>
                                  <TableHead className="">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {reports?.length! > 0 ? (
                                  reports
                                    ?.filter((val) => val.courseId._id == id)
                                    .map((report) => (
                                      <TableRow key={report._id}>
                                        <TableCell className="font-medium">
                                          <img
                                            src={
                                              report.courseId.image.image_url
                                            }
                                            alt="Profile Picture"
                                            className="profile-pic"
                                          />
                                        </TableCell>
                                        <TableCell>
                                          {report.courseId.title}
                                        </TableCell>
                                        <TableCell>{report.report}</TableCell>
                                        <TableCell align="center">
                                          <div className="flex gap-3">
                                            <Button
                                              type="button"
                                              size={"sm"}
                                              className="rounded-full "
                                              onClick={() =>
                                                handlePlay(
                                                  report.content
                                                )
                                              }
                                            >
                                              play
                                            </Button>
                                            <Button
                                              onClick={() =>
                                                handleDelete(report.content)
                                              }
                                              size={"sm"}
                                              type="button"
                                              className={`rounded-full ${
                                                value.isListed
                                                  ? "bg-green-400 text-xs"
                                                  : "bg-red-500 text-xs"
                                              }`}
                                            >
                                              {value.isListed
                                                ? "UnList"
                                                : "List"}
                                            </Button>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={20}>
                                      No reports for this course.
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
                          <Button
                            size={"sm"}
                            onClick={() => {
                              setStudents(value?.students!);
                            }}
                            className="bg-light text-xs text-black rounded-full border-1 border-black"
                          >
                            View
                          </Button>
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
                                     {
                                      student.avatar.avatar_url?
                                      <img
                                        src={student.avatar.avatar_url}
                                        alt="Profile Picture"
                                        className="profile-pic w-20"
                                      />
                                      :
                                      <i className="bi bi-person-circle text-3xl"></i>
                                     }
                                      
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
                  <TableCell
                    align="center"
                    colSpan={20}
                    className="font-medium"
                  >
                    No Courses Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                  size={undefined}
                    onClick={() => {
                      if (page > 1) {
                        setPage((prev) => (prev -= 1));
                      }
                    }}
                    className={`text-black ${
                      page > 1 ? "cursor-pointer" : ""
                    } `}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink  size={undefined} className="text-black" isActive>
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
                    className={`text-black ${
                      page < totalPage ? "cursor-pointer" : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Card>
        {/* card end */}
      </div>
    </div>
  );
};

export default AdminListCourses;
