import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { User } from "../../@types/userType";
import toast from "react-hot-toast";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ICourse } from "../../@types/courseType";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { IUser } from "../../@types/chatUser";
import { IInstructorSubscribe } from "../../@types/instructorSubscribe";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import useRequest from "../../hooks/useRequest";
import instructorRoutes from "../../service/endPoints/instructorEndPoints";

export function Coursestable() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const instructorId = useSelector((state: User) => state.id);
  const { doRequest} = useRequest();
  const [students, setStudents] = useState<IUser[]>([]);
  const [subscriptions, setSubscriptions] = useState<IInstructorSubscribe[]>(
    []
  );




  useEffect(() => {
    doRequest({
      url:`${instructorRoutes.getCourses}?instructorId=${instructorId}&&search=${search}&&sort=${sort}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        setCourses(response.courses);
      }
    });
    doRequest({
      url:`${instructorRoutes.subscribe}/${instructorId}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        setSubscriptions(response.plans);
      }
    });
  }, [sort]);

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
    doRequest({
      url:`${instructorRoutes.listCourses}/${course._id}`,
      method:"patch",
      body:{},
      onSuccess:async(res)=>{
        doRequest({
          url:`${instructorRoutes.getCourses}?instructorId=${instructorId}&&search=${search}&&sort=${sort}`,
          method:"get",
          body:{},
          onSuccess:(response)=>{
            setCourses(response.courses);
            if (res.course.isListed) {
              toast.success("Successfully Listed Course");
            } else {
              toast.success("Successfully UnListed Course");
            }
          }
        });
      }
    });
  };

  const checkSubscription = (course: ICourse) => {
    if (subscriptions.length > 0) {
      navigate(`/instructor/addTest/${course._id}`)
    } else {
      navigate("/instructor/purchaseSubscription");
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
        <Select onValueChange={(value) => setSort(value)}>
          <SelectTrigger id="framework" className="h-8 lg:w-[200px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Old">Old</SelectItem>
            <SelectItem value="Price Low - High">Price Low - High</SelectItem>
            <SelectItem value="Price High - Low">Price High - Low</SelectItem>
            <SelectItem value="Name High - Low">Name High - Low</SelectItem>
            <SelectItem value="Name Low - High">Name Low - High</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs text-white">Title</TableHead>
                <TableHead className="text-xs text-white">Thumbnail</TableHead>
                <TableHead className="text-xs text-white">Created At</TableHead>
                <TableHead className="text-xs text-white">Status</TableHead>
                <TableHead className="text-xs text-white">Price</TableHead>
                <TableHead className="text-white text-center">
                  Students
                </TableHead>
                <TableHead className="text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white">
              {listingCourses.length > 0 ? (
                listingCourses.map((val: ICourse, index) => (
                  <TableRow key={index}>
                    <TableCell className=" text-xs ">{val.title}</TableCell>
                    <TableCell className="text-xs ">{val.thumbnail}</TableCell>
                    <TableCell className="text-xs">
                      {val.createdAt.slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          val.isListed
                            ? "bg-black text-green-400 text-xs"
                            : "bg-black text-red-500 text-xs"
                        }
                      >
                        {val.isListed ? "Listed" : "UnListed"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{val.price}</TableCell>

                    <TableCell align="center">
                      <Sheet>
                        <SheetTrigger
                          className="bg-black text-xs text-white rounded-full border-1 border-white p-2"
                          onClick={() => {
                            setStudents(val?.students!);
                          }}
                        >
                          View Students
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-screen">
                          <SheetHeader>
                            <SheetTitle> Students Lists.</SheetTitle>
                            <SheetDescription>
                            </SheetDescription>
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
                                          className="profile-pic rounded-full"
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

                    <TableCell>
                      <Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreHorizontal />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/instructor/editCourse/${val._id}`)
                              }
                            >
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DialogTrigger asChild>
                              <DropdownMenuItem>
                                {val.isListed ? "UnList" : "List"}
                              </DropdownMenuItem>
                            </DialogTrigger>
                            {val.test ? (
                              <DropdownMenuItem
                                onClick={() => {
                                  navigate(`/instructor/editTest/${val.test._id}`)
                                }}
                              >
                                Edit Test
                                <i className="bi bi-book-fill"></i>
                              </DropdownMenuItem>
                            ) : (
                                  
                                  <DropdownMenuItem
                                    onClick={() => checkSubscription(val)}
                                  >
                                    Add Test
                                    <i className="bi bi-book-fill"></i>
                                  </DropdownMenuItem>

                                )
                            
                            }
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              Are you absolutly sure you want to list this
                              items?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                className="bg-black text-white"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                onClick={() => handleCourses(val)}
                                className="bg-black text-white"
                              >
                                Continue
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
