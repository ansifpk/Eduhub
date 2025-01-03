import AdminAside from "@/Components/admin/AdminAside";
import { Card, CardContent, CardDescription } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { getCourses, students } from "@/Api/admin";
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

const AdminListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchAllStudents = async () => {
      const response = await getCourses(search, sort);
      setCourses(response);
    };
    fetchAllStudents();
  }, [search, sort]);
  const handleListeCourse = (id: string) => {
    console.log("hi", id);
  };
  console.log(students);
  
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
                    <TableHead className="w-[100px] ">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Thumbnail</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-center">Students</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
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
                        <TableCell>{value.title}</TableCell>
                        <TableCell>{value.thumbnail}</TableCell>
                        <TableCell>
                          {moment(value.createdAt).calendar()}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={()=>{
                              setStudents(value?.students!)
                              onOpen()
                            }}
                            className="bg-light text-black rounded-full border-1 border-black"
                          >
                            View Students
                          </Button>

                          <Drawer
                            isOpen={isOpen}
                            size={"4xl"}
                            onClose={onClose}
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
                                            <TableRow  key={student._id}> 
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
                                      // variant="light"
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
                        <TableCell align="center">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                type="button"
                                className={`rounded-full ${
                                  value.isListed
                                    ? "bg-success-400"
                                    : "bg-danger-500"
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminListCourses;
