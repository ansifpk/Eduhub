import AdminAside from "@/Components/admin/AdminAside";
import { Card, CardContent, CardDescription } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { delteLecture, getCourses, getReports, students } from "@/Api/admin";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { ICourse } from "@/@types/courseType";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  
  useDisclosure,
} from "@nextui-org/react";
import { IUser } from "@/@types/chatUser";
import { IReport } from "@/@types/report";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { ISection } from "@/@types/sectionType";
import { ILecture } from "@/@types/lectureType";
import { Pagination, Stack, Typography } from "@mui/material";

const AdminListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [video, setVideo] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen:isStudentOpen , onOpen:onStudentOpen, onClose:onStudentClose } = useDisclosure();
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onClose: onReportClose,
  } = useDisclosure();
  const [reports, setReports] = useState<IReport[]>([]);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    const fetchAllStudents = async () => {
      const response = await getCourses(search,sort,page);
      if(response){
        setCourses(response.courses);
        setTotalPage(response.pages)
        const repo = await getReports();
        if (repo) {
          setReports(repo);
        }
      }
      
    };

    fetchAllStudents();
  }, [search, sort,page]);
  const handleListeCourse = (id: string) => {
    console.log("hi", id);
  };
  // console.log("courses", courses);

  const viewReports = (course: ICourse) => {
    console.log("courseId", course);
    setId(course._id);
    onReportOpen();
  };

  const handlePlay = (url: string,course:ICourse) => {
    setVideo(url)
  };
  
  const handleDelete = async (url: string) => {
 
    const response  = await delteLecture(url)
    if(response.success){
      const repo = await getReports();
        if (repo) {
          setReports(repo);
          toast.success("deleted successfully")
        }
    }
    
  };
  console.log(page,totalPage);
  
  return (
    <div className="container-fluid ">
      <div className="row">
        <AdminAside />
        <div className="col-md-10">
          <div className="welcome mt-4 mb-4 bg-purple-600">
            <h1>Welcome back, Admin</h1>
            <img
              src="https://via.placeholder.com/50"
              alt="Profile Picture"
              className="profile-pic"
            />
          </div>
          <div className="grid grid-cols-1">
            <div className="d-flex justify-content-between">
              <h1 className="text-lg font-bold">Courses</h1>
              <div className="flex w-50 gap-1">
                <Input
                  type="search"
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="md:w-[100px] lg:w-[300px] "
                />
                <Select onValueChange={(value) => setSort(value)}>
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
                    {/* <TableHead className="text-center">Actions</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.length > 0 ? (
                    courses.map((value: ICourse, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {" "}
                          <img
                            src={value.image.image_url}
                            alt="Profile Picture"
                            className="profile-pic"
                          />
                        </TableCell>
                        <TableCell className="text-xs">{value.title}</TableCell>
                        <TableCell className="text-xs">
                          {value.thumbnail}
                        </TableCell>
                        <TableCell className="text-xs">
                          {moment(value.createdAt).calendar()}
                        </TableCell>
                        <TableCell className="text-xs">
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
                          <Drawer
                            isOpen={isReportOpen}
                            size={"4xl"}
                            onClose={onReportClose}
                          >
                            <DrawerContent>
                              {(onClose) => (
                                <>
                                  <DrawerHeader className="flex flex-col gap-1">
                                    report Lists.
                                  </DrawerHeader>
                                  <DrawerBody >
                                    {video?(
                                     
                                      <video
                                      src={`${video}`}
                                      autoPlay={true}
                                      controls
                                     
                                      muted={false}
                                      controlsList="nodownload"
                                    />
                                  
                                    ):(
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
                                            ?.filter(
                                              (val) => val.courseId._id == id
                                            )
                                            .map((report) => (
                                              <TableRow key={report._id}>
                                                <TableCell className="font-medium">
                                                  {" "}
                                                  <img
                                                    src={
                                                      report.courseId.image
                                                        .image_url
                                                    }
                                                    alt="Profile Picture"
                                                    className="profile-pic"
                                                  />
                                                </TableCell>
                                                <TableCell>
                                                  {report.courseId.title}
                                                </TableCell>
                                                <TableCell>
                                                  {report.report}
                                                </TableCell>
                                                 <TableCell align="center" >
                                                   <div className="flex gap-3">
                                                   <Button  type="button" size={'sm'} className="rounded-full " onClick={()=>handlePlay(report.content,value)}>play</Button>
                                                   <Button
                                                      onClick={()=>handleDelete(report.content)}
                                                      size={"sm"}
                                                      type="button"
                                                      className={`rounded-full ${
                                                        value.isListed
                                                          ? "bg-success-400 text-xs"
                                                          : "bg-danger-500 text-xs"
                                                      }`}
                                                    >
                                                        {value.isListed ? "UnList" : "List"}
                                                      </Button>
                                                   </div>
                                                 </TableCell>
                                              </TableRow>
                                            ))
                                        ) : (
                                          <TableRow>
                                            <TableCell>
                                              No reports for this course.
                                            </TableCell>
                                          </TableRow>
                                        )}
                                      </TableBody>
                                    </Table>
                                    )}
                                  
                                  </DrawerBody>
                                  <DrawerFooter>
                                     {video?(
                                       <Button color="danger" onClick={()=>setVideo('')}>
                                       Close
                                     </Button>
                                     ):(
                                      <Button color="danger" onClick={onClose}>
                                      Close
                                    </Button>
                                     )}
                                  </DrawerFooter>
                                </>
                              )}
                            </DrawerContent>
                          </Drawer>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size={"sm"}
                            onClick={() => {
                              setStudents(value?.students!);
                              onStudentOpen();
                            }}
                            className="bg-light text-xs text-black rounded-full border-1 border-black"
                          >
                            View
                          </Button>

                          <Drawer
                            isOpen={isStudentOpen}
                            size={"full"}
                            onClose={onStudentClose}
                          >
                            <DrawerContent>
                              {(onClose) => (
                                <>
                                  <DrawerHeader className="flex flex-col gap-1">
                                    Students Lists.
                                  </DrawerHeader>
                                  <DrawerBody>
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
                                                {" "}
                                                <img
                                                  src={
                                                    "https://github.com/shadcn.png"
                                                  }
                                                  alt="Profile Picture"
                                                  className="profile-pic"
                                                />
                                              </TableCell>
                                              <TableCell>
                                                {student.name}
                                              </TableCell>
                                              <TableCell>
                                                {student.email}
                                              </TableCell>
        
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
                                  </DrawerBody>
                                  <DrawerFooter>
                                    <Button
                                      color="danger"
                                      onClick={onClose}
                                    >
                                      Close
                                    </Button>
                                    <Button color="primary" onClick={onClose}>
                                      Action
                                    </Button>
                                  </DrawerFooter>
                                </>
                              )}
                            </DrawerContent>
                          </Drawer>
                        </TableCell>
                        {/* <TableCell align="center">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size={"sm"}
                                type="button"
                                className={`rounded-full ${
                                  value.isListed
                                    ? "bg-success-400 text-xs"
                                    : "bg-danger-500 text-xs"
                                }`}
                              >
                                {value.isListed ? "UnList" : "List"}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will deney access of this user to enter
                                  Eduhub
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  className="bg-black text-white"
                                  type="button"
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogCancel
                                  className="bg-black text-white"
                                  type="button"
                                  onClick={() => handleListeCourse(value._id!)}
                                >
                                  Continue
                                </AlertDialogCancel>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell> */}
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
              <Stack className="flex items-center justify-center" spacing={2}>
                    <div>
                        <Pagination count={totalPage} page={page} onChange={handleChange} />
                    </div>
              </Stack>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminListCourses;
