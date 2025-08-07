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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { useSelector } from "react-redux";
import { IUser } from "../../@types/chatUser";
import { User } from "../../@types/userType";
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
import { useSocket } from "../../context/socketContext";
import useRequest from "../../hooks/useRequest";
import adminRoutes from "../../service/endPoints/adminEndPoints";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

const AdminListInstructors = () => {
  const [instructor, setInstructors] = useState([]);
  const [requests, setRequests] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const userId = useSelector((state: User) => state.id);
  const socket = useSocket();
  const { doRequest, errors } = useRequest();

  useEffect(() => {
    doRequest({
      url: `${adminRoutes.instructors}?search=${search}&&sort=${sort}&&page=${page}`,
      body: {},
      method: "get",
      onSuccess: (response) => {
        const arr = response.instructors.filter(
          (value: IUser) => value.status == "Approved"
        );
        setInstructors(arr);
        setTotalPage(response.pages);
        response.instructors.map((value: IUser) => {
          if (value.status == "pending") {
            setRequests((prev) => {
              return prev + 1;
            });
          }
        });
      },
    });
  }, [search, sort]);

  const handleBlockInstructroctor = async (userId: string) => {
    doRequest({
      url: `${adminRoutes.blockUser}/${userId}`,
      method: "patch",
      body: {},
      onSuccess: (response) => {
        if (response.data.isBlock) {
          doRequest({
            url: `${adminRoutes.instructors}?search=${search}&&sort=${sort}&&page=${page}`,
            body: {},
            method: "get",
            onSuccess: (response) => {
              const arr = response.instructors.filter(
                (value: IUser) => value.status == "Approved"
              );
              setInstructors(arr);
              setTotalPage(response.pages);
              response.instructors.map((value: IUser) => {
                if (value.status == "pending") {
                  setRequests((prev) => {
                    return prev + 1;
                  });
                }
              });
              socket?.emit(`blockUser`, userId);
              toast.success("Successfully Block Instructroctor");
            },
          });
        } else {
          doRequest({
            url: `${adminRoutes.instructors}?search=${search}&&sort=${sort}&&page=${page}`,
            body: {},
            method: "get",
            onSuccess: (response) => {
              const arr = response.instructors.filter(
                (value: IUser) => value.status == "Approved"
              );
              setInstructors(arr);
              setTotalPage(response.pages);
              response.instructors.map((value: IUser) => {
                if (value.status == "pending") {
                  setRequests((prev) => {
                    return prev + 1;
                  });
                }
              });
              toast.success("Successfully UnBlock Instructroctor");
            },
          });
        }
      },
    });
  };

  const createMessageWithUser = async (recipientId: string) => {
    try {
      doRequest({
        url: adminRoutes.chat,
        body: { userId, recipientId, role: "userToInstructor" },
        method: "post",
        onSuccess: (response) => {
          return navigate(`/admin/messages?chatId=${response.chat._id}`);
        },
      });
    } catch (error) {
      console.error(error);
    }
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
        <div className="w-full">
          <div className="flex justify-between my-3">
            <h1 className="text-lg font-bold">Instructors</h1>
            <div className="flex">
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
          {/* table card  */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center w-[100px] ">
                    Image
                  </TableHead>
                  <TableHead className=" text-center w-[200px]">Name</TableHead>
                  <TableHead className="text-center w-[100px]">Email</TableHead>
                  <TableHead className="text-center w-[100px]">
                    Connect
                  </TableHead>
                  <TableHead className="text-center w-[100px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructor.length > 0 ? (
                  instructor.map((value: IUser, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                      {
                          value.avatar.avatar_url?
                          <img
                            src={
                              value.avatar.avatar_url
                            }
                            alt="Profile Picture"
                            className="rounded-full w-10"
                          />
                          :
                         <i className="bi bi-person-circle text-4xl"></i>
                         }
                      </TableCell>
                      <TableCell>{value.name}</TableCell>
                      <TableCell>{value.email}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => createMessageWithUser(value?._id!)}
                          className="bg-light border-1 border-black rounded-full text-black"
                        >
                          message
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              className={`rounded-full ${
                                value.isBlock ? "bg-red-500" : "bg-green-500"
                              }`}
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
                                onClick={() =>
                                  handleBlockInstructroctor(value._id!)
                                }
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
                    <TableCell align="center" colSpan={20}>
                      No instructors Available
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
                    
                      onClick={() => {
                        if (page > 1) {
                          setPage((prev) => (prev -= 1));
                        }
                      } }
                      className={`text-black ${page > 1 ? "cursor-pointer" : ""} `} size={undefined}                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink size={undefined} className="text-black" isActive>
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
          {/* table card end */}
        </div>
      </div>
    </div>
  );
};

export default AdminListInstructors;
