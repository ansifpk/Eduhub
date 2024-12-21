import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { User } from "@/@types/userType";
import { getCourses, listCourses } from "@/Api/instructor";
import toast from "react-hot-toast";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ICourse } from "@/@types/courseType";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

export function Coursestable() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const instructorId = useSelector((state: User) => state.id);

  useEffect(() => {
    const res = async () => {
      const data = await getCourses(instructorId);
      if (data.success) {
        setCourses(data.courses);
      }
    };
    res();
  }, []);


  const listingCourses = courses.filter((val: ICourse) => {
    let arr = val.title
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
    return arr;
  });

  const handleCourses = async (course: ICourse) => {
    if (course.sections.length == 0) {
      return toast.error(
        "You cannot list this course becouse the video uploading is still processing..."
      );
    }
    console.log("list akkam");

    const res = await listCourses(course._id);
    if (res.success) {
      const respons = await getCourses(instructorId);
      setCourses(respons.courses);
      if (res.course.isListed) {
        toast.success("Successfully Listed Course");
      } else {
        toast.success("Successfully UnListed Course");
      }
    } else {
      toast.success(res.response.data.message);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between space-y-2 w-full">
   
        <div>
          <div className="text-white">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here is the list of courses of your...
            </p>
          </div>
        </div>
        <div>
          <div className="text-white flex gap-2">
            <div>
              <Input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="md:w-[100px] lg:w-[300px] bg-black text-white"
              />
            </div>
            <Button
              className="bg-white text-black"
              onClick={() => navigate("/instructor/createCourse")}
              variant="outline"
            >
              create Course
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger id="framework" className="h-8 w-[50px] lg:w-[150px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Old">Old</SelectItem>
            <SelectItem value="Name - A-Z">Name - A-Z</SelectItem>
            <SelectItem value="Name Z-A">Name Z-A</SelectItem>
            <SelectItem value="Price Low - Highy">Price Low - Highy</SelectItem>
            <SelectItem value="Name Highy - Low">Name Highy - Low</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead align="center">Students</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white">
              {listingCourses.length > 0 ? (
                listingCourses.map((val: ICourse, index) => (
                  <TableRow key={index}>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.thumbnail}</TableCell>
                    <TableCell>{val.createdAt.slice(0, 10)}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          val.isListed
                            ? "bg-black text-success"
                            : "bg-black text-danger"
                        }
                      >
                        {val.isListed ? "Listed" : "UnListed"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Sheet key={"left"}>
                        <SheetTrigger>
                          <Button
                            className="bg-black border border-white"
                            type="button"
                          >
                            students
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[900px] h-[900px] ">
                          <SheetHeader>
                            <SheetTitle>Studnets list</SheetTitle>
                            <SheetDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </SheetDescription>
                          </SheetHeader>
                          <Table className="rounded-md border">
                            <TableHeader>
                              <TableRow>
                                <TableHead>name</TableHead>
                                <TableHead>email</TableHead>
                                <TableHead>Created At</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {val.students?.length! > 0 ? (
                                 val.students?.map((student,index)=>(
                                  <TableRow key={index}>
                                  <TableCell>{student.name}</TableCell>
                                  <TableCell>{student.email}</TableCell>
                                  <TableCell>
                                    "{val.createdAt.slice(0, 10)}"
                                  </TableCell>
                                </TableRow>
                                 ))
                              ) : (
                                <TableRow >
                                  <TableCell align="center" colSpan={20}>No students purchased this course</TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                    <TableCell align='right'>
                     <div className="flex gap-1">
                     <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className={val.isListed ? "bg-success text-white" : "bg-danger text-white"}  type="button">
                                {val.isListed ? "UnList" : "List"}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Do you wnat to{" "}
                                  {val.isListed ? "Un List" : "List"} this
                                  Course ?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogAction
                                  className="bg-black text-white"
                                  type="button"
                                >
                                  Cancel
                                </AlertDialogAction>
                                <AlertDialogAction
                                  type="button"
                                  className="bg-black text-white"
                                  onClick={() => handleCourses(val)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <Button
                          type="button"
                             onClick={() =>
                              navigate(`/instructor/editCourse/${val._id}`)
                            }
                            className="border border-white bg-black text-white "
                            
                          >
                            Edit
                          </Button>
                     </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={20}>
                    No courses Exists
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
