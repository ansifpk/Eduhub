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
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import useRequest from "../../hooks/useRequest";
import adminRoutes from "../../service/endPoints/adminEndPoints";
import { Label } from "../../components/ui/label";


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
  const { doRequest, errors } = useRequest();
  useEffect(() => {
    doRequest({
      url: `${adminRoutes.instructorRequest}`,
      method: "get",
      body: {},
      onSuccess:(response) => {
        setInstructors(response);
      },
    });
  }, []);

  const handleApproval = async (email: string, status: string) => {
    doRequest({
      url: adminRoutes.instructorAprovel,
      method: "patch",
      body: { email, status },
      onSuccess: () => {
        doRequest({
          url: `${adminRoutes.instructorRequest}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setInstructors(response);
          },
        });
      },
    });
  };

  useEffect(() => {
    errors?.map((err) => toast.error(err.message));
  }, [errors]);

  return (
    <div className="flex gap-2">
      <AdminAside />
      <div className="w-full mr-3">
      <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="text-3xl">Welcome back, Admin</span>
        </div>
        <div>
          <div className="flex w-full justify-between gap-4 my-3 items-center">
            <div className="flex w-full gap-4 items-center">
              <Button
                onClick={() => navigate(-1)}
                className="bg-purple-600 hover:bg-purple-600"
              >
                <i className="bi bi-arrow-left"></i>
              </Button>
              <h1 className="text-lg font-bold">Instructor Requests</h1>
            </div>
          </div>

          {/* card start */}
          <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
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
                        <TableCell>
                          <div className="grid grid-cols-2 gap-2">
                            <Sheet key={"top"}>
                              <SheetTrigger asChild>
                                <Button
                                  className={

                                       "bg-purple-600 hover:bg-purple-600"
                                  }
                                >
                                  View Detailes
                                </Button>
                              </SheetTrigger>
                              <SheetContent side={"top"}>
                                <SheetHeader>
                                  <SheetTitle>User Request to become an Instructor</SheetTitle>
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
                                      <DialogTitle>
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
                                      </DialogTitle>

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
                                      <DialogTitle>
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
                                      </DialogTitle>
                                    </Dialog>
                                  </div>
                                </div>
                                <SheetFooter>
                                  <SheetClose asChild >
                                    <div className="flex gap-4">
                                    <Button className="bg-red-500" onClick={()=>handleApproval(value.email,"Rejected")} type="button">Reject</Button>
                                    <Button className="bg-green-500" onClick={()=>handleApproval(value.email,"Approved")} type="button">Approv</Button>
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
                      <TableCell align="center" colSpan={20} className="font-medium">
                        No Instructroctors Requests Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          {/* card end */}
        </div>
      </div>
    </div>
  );
};

export default AdminInstructorRequests;
