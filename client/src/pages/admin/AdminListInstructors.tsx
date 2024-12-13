import AdminAside from "@/Components/admin/AdminAside";
import { Card } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { instructors, blockUser } from "@/Api/admin";
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

interface IUser {
  _id?: string;
  name: string;
  email: string;
  status: string;
  isBlock: boolean;
  isInstructor: boolean;
  isAdmin: boolean;
  avatar: {
    id: string;
    avatar_url: string;
  };
}

const AdminListInstructors = () => {
  const [instructor, setInstructors] = useState([]);
  const [requests, setRequests] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllinstructors = async () => {
      const response = await instructors();
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
  }, []);
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
              <Button
                type="button"
                onClick={() => navigate("/admin/instructorRequests")}
                className="mb-3"
              >
                Instructor Requests {requests}
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] ">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button
                                  className={
                                    value.isBlock
                                      ? "btn btn-danger"
                                      : "btn btn-success"
                                  }
                                >
                                  {value.isBlock ? "UnBlock" : "BLock"}
                                </button>
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
