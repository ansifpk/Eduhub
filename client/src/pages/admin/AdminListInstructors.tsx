import AdminAside from "@/Components/admin/AdminAside";
import { Card } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { instructors, blockUser, adminCreateMessage } from "@/Api/admin";
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
import { useNavigate } from "react-router-dom";
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
} from "@/Components/ui/alert-dialog";
import { log } from "node:console";
import { useSelector } from "react-redux";
import { IUser } from "@/@types/chatUser";
import { User } from "@/@types/userType";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";


const AdminListInstructors = () => {
  const [instructor, setInstructors] = useState([]);
  const [requests, setRequests] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const navigate = useNavigate();
  const userId = useSelector((state:User)=>state.id)
  useEffect(() => {
    const fetchAllinstructors = async () => {
      const response = await instructors(search,sort);
      if (response) {
        const arr = response.filter((value:IUser)=>value.status == "Approved" )
        setInstructors(arr)

        response.map((value: IUser) => {
          if (value.status == "pending") {
            setRequests((prev) => {
              return prev + 1;
            });
          }
          
        });
      }
    };
    fetchAllinstructors();
  },[search,sort]);

  const handleBlockInstructroctor = async (userId: string) => {
    const response = await blockUser(userId);
    if (response.success) {
      console.log(response.data, "/////////////");
      if (response.data.isBlock) {
        const res = await instructors();
        if (res) {
          setInstructors(res);
          toast.success("Successfully Block Instructroctor");
          return;
        }
      } else {
        const res = await instructors();
        if (res) {
          setInstructors(res);
          toast.success("Successfully UnBlock Instructroctor");
          return;
        }
      }
    } else {
      return toast.error(response.response.data.message);
    }
  };

   const createMessageWithUser = async (recipientId: string) => {
      try {
        const response = await adminCreateMessage(
          userId!,
          recipientId,
          "userToInstructor"
        );
        if (response.success) {
          return navigate(`/admin/messages?chatId=${response.chat._id}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

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
              <h1 className="text-lg font-bold">Instructors</h1>
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
                <Button
                type="button"
                onClick={() => navigate("/admin/instructorRequests")}
                className="mb-3"
              >
                Instructor Requests {requests}
              </Button>
              </div>
             
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center w-[100px] ">Image</TableHead>
                    <TableHead className=" text-center w-[200px]">Name</TableHead>
                    <TableHead className="text-center w-[100px]">Email</TableHead>
                    <TableHead className="text-center w-[100px]">Connect</TableHead>
                    <TableHead className="text-center w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instructor.length > 0 ? (
                    instructor
                      .map((value: IUser, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {" "}
                            <img
                              src={
                                value.avatar.avatar_url
                                  ? value.avatar.avatar_url
                                  : "https://github.com/shadcn.png"
                              }
                              alt="Profile Picture"
                              className="profile-pic"
                            />
                          </TableCell>
                          <TableCell>{value.name}</TableCell>
                          <TableCell>{value.email}</TableCell>
                          <TableCell align="center">
                            <Button onClick={() => createMessageWithUser(value?._id!)} className="bg-light border-1 border-black rounded-full text-black">
                              message
                            </Button>
                          </TableCell>
                          <TableCell className="text-center">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  className={

                                    `rounded-full ${value.isBlock
                                      ?"bg-danger"
                                      :"bg-success-500"}`
                                  }
                                >
                                  {value.isBlock ? "UnBlock" : "BLock"}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will deney access of this user to enter Eduhub  
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-black text-white" type="button" >Cancel</AlertDialogCancel>
                                  <AlertDialogCancel className="bg-black text-white" type="button"  onClick={() =>
                                    handleBlockInstructroctor(value._id!)
                                  } >Continue</AlertDialogCancel>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                          
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={20}>
                        No instructors Available
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

export default AdminListInstructors;
