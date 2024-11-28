import AdminAside from "@/Components/admin/AdminAside";
import { Card } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { instructors, blockInstructors, instructorAprovel } from "@/Api/admin";
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/Components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../Components/ui/dialog";

interface IUser {
  _id?: string;
  name: string;
  email: string;
  qualification: string;
  experience: string;
  status: string;
  isBlock: boolean;
  avatar: {
    id: string;
    avatar_url: string;
  };
  certificate: {
    id: string;
    certificate_url: string;
  };
  cv: {
    id: string;
    cv_url: string;
  };
}

const AdminInstructorRequests = () => {
  const [instructor, setInstructors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllinstructors = async () => {
      const response = await instructors();

      const requests = response.filter(
        (value: IUser) => value.status == "pending"
      );

      setInstructors(requests);
    };
    fetchAllinstructors();
  }, []);
  const handleApproval = async (email: string,status:string) => {
    const response = await instructorAprovel(email,status)

    if (response) {

      const respo = await instructors();

      const requests = respo.filter(
        (value: IUser) => value.status == "pending"
      );
      toast.success(`User request ${status} Successfully `);
      setInstructors(requests);
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
          <div className="grid grid-cols-1 ">
            <div className="d-flex justify-content-between">
              <h1 className="text-lg font-bold">Instructor Requests</h1>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] ">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instructor.length > 0 ? (
                    instructor.map((value: IUser, index) => (
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
                        <TableCell className="">
                          <div className="grid grid-cols-2 gap-2">
                            <Sheet key={"top"}>
                              <SheetTrigger asChild>
                                <button
                                  className={
                                  
                                       "btn btn-success"
                                  }
                                >
                                  View Detailes
                                </button>
                              </SheetTrigger>
                              <SheetContent side={"top"}>
                                <SheetHeader>
                                  <SheetTitle>User Request to become an Instructor</SheetTitle>
                                  <SheetDescription>
                                    
                                  </SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="name"
                                      className="text-right"
                                    >
                                      Name
                                    </Label>
                                    <Input
                                      id="name"
                                      value={value.name}
                                      className="col-span-3"
                                      onChange={() => ""}
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="username"
                                      className="text-right"
                                    >
                                      Email
                                    </Label>
                                    <Input
                                      onChange={() => ""}
                                      id="username"
                                      value={value.email}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="username"
                                      className="text-right"
                                    >
                                      Qualification
                                    </Label>
                                    <Input
                                      onChange={() => ""}
                                      id="username"
                                      value={value.qualification}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="username"
                                      className="text-right"
                                    >
                                      Expirience
                                    </Label>
                                    <Input
                                      onChange={() => ""}
                                      id="username"
                                      value={value.experience}
                                    />
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline">
                                          View Certificate
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[600px]">
                                        <div className="grid gap-4 py-4">
                                          <img
                                            src={
                                              value.certificate.certificate_url
                                            }
                                            alt="certificate image"
                                          />
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="username"
                                      className="text-right"
                                    >
                                      CV
                                    </Label>
                                    
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline">
                                          View CV
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[600px]">
                                        <div className="grid gap-4 py-4">
                                          <img
                                            src={
                                              value.cv.cv_url
                                            }
                                            alt="certificate image"
                                          />
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </div>
                                <SheetFooter>
                                  <SheetClose asChild >
                                    <div className="flex gap-4">
                                    <Button className="bg-danger" onClick={()=>handleApproval(value.email,"Rejected")} type="button">Reject</Button>
                                    <Button className="bg-success" onClick={()=>handleApproval(value.email,"Apporved")} type="button">Apporve</Button>
                                    </div>
                                  </SheetClose>
                                </SheetFooter>
                              </SheetContent>
                            </Sheet>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="font-medium">
                        No Instructroctors Requests Found
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

export default AdminInstructorRequests;
