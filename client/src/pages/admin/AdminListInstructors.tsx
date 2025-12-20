import type { IUserProfile } from "@/@types/userProfile";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "../../components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useSocket } from "@/context/socketContext";
import useRequest from "@/hooks/useRequest";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminListInstructors = () => {
  const [instructors, setInstructors] = useState<IUserProfile[]>([]);
  const [search, setSearch] = useState("");
  const [debouns, setDebouns] = useState("");
  const [requests, setRequests] = useState(0);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const socket = useSocket();
  const navigate = useNavigate();
  const { doRequest, err } = useRequest();

  useEffect(() => {
    doRequest({
      url: `${adminRoutes.instructors}?search=${search}&&sort=${sort}&&page=${page}`,
      body: {},
      method: "get",
      onSuccess: (response) => {
        setInstructors(response[0].instructors);
        setTotalPage(response[0].instructorTotalPages[0].totalPages);
        setRequests(response[0].requests[0].totelRequests);
      },
    });
  }, [search, sort, page]);
  useEffect(() => {
    const intervel = setTimeout(() => {
      setPage(1);
      setSearch(debouns);
    }, 600);
    return () => {
      clearTimeout(intervel);
    };
  }, [debouns]);

  const handleBlockInstructor = (instructorId: string) => {
    doRequest({
      url: `${adminRoutes.blockUser}/${instructorId}`,
      method: "patch",
      body: {},
      onSuccess: (response) => {
        if (response.data.isBlock) {
          doRequest({
            url: `${adminRoutes.instructors}?search=${search}&&sort=${sort}&&page=${page}`,
            body: {},
            method: "get",
            onSuccess: (response) => {
              setInstructors(response[0].instructors);
              setTotalPage(response[0].instructorTotalPages[0].totalPages);
              setRequests(response[0].requests[0].totelRequests);
              socket?.emit(`blockUser`, instructorId);
              toast.success("Successfully Block Instructroctor");
            },
          });
        } else {
          doRequest({
            url: `${adminRoutes.instructors}?search=${search}&&sort=${sort}&&page=${page}`,
            body: {},
            method: "get",
            onSuccess: (response) => {
              setInstructors(response[0].instructors);
              setTotalPage(response[0].instructorTotalPages[0].totalPages);
              setRequests(response[0].requests[0].totelRequests);
              toast.success("Successfully UnBlock Instructroctor");
            },
          });
        }
      },
    });
  };

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div className="w-[80%] ml-auto">
      <div className="px-5 flex flex-col space-y-5">
        <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="font-bold text-3xl">Welcome back, Admin</span>
        </div>

        <div className="space-y-5">
          <div className="flex justify-between">
            <span className="text-3xl font-bold underline">List Instructors</span>
            <div className="flex gap-2">
              <input
                type="search"
                onChange={(e) => setDebouns(e.target.value)}
                className="border rounded py-1 px-2 border-purple-600"
                placeholder="Search instructors here..."
              />
              <Select onValueChange={(value) => setSort(value)}>
                <SelectTrigger className="w-[150px] border rounded border-purple-600">
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
               <button
                type="button"
                onClick={() => navigate("/admin/instructorRequests")}
                className="relative cursor-pointer bg-purple-600 rounded px-2 text-white"
              >
                Instructor Requests 
                <span className="absolute -top-3 -right-1 size-14 text-white bg-purple-600 w-5 h-auto rounded-full" >{requests}</span>
              </button>
            </div>
          </div>
          <Table className="border-2 rounded-lg border-purple-600">
            <TableCaption>
              {instructors.length > 0 && (
                <Pagination>
                  <PaginationContent className="gap-10">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => {
                          if (page > 1) {
                            setPage((prev) => (prev -= 1));
                          }
                        }}
                        className={`text-purple-600 hover:bg-white ${
                          page > 1 ? "cursor-pointer" : ""
                        } `}
                        size={undefined}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        size={undefined}
                        className="text-purple-600 border border-purple-600"
                        isActive
                      >
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
                        className={`text-purple-600 hover:bg-white ${
                          page < totalPage ? "cursor-pointer" : ""
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Image</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Joined At</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructors.length > 0 ? (
                instructors.map((instructor) => (
                  <TableRow key={instructor._id}>
                    <TableCell className="flex  justify-center">
                      {
                        <Avatar>
                          <AvatarImage
                            src={instructor.avatar.avatar_url}
                            alt="@shadcn"
                          />
                          <AvatarFallback>
                            <i className="bi bi-person-fill text-3xl"></i>
                          </AvatarFallback>
                        </Avatar>
                      }
                    </TableCell>
                    <TableCell className="text-center">
                      {instructor.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {instructor.email}
                    </TableCell>
                    <TableCell className="text-center">
                      {moment(new Date(instructor.createdAt)).calendar()}
                    </TableCell>
                    <TableCell className="text-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className={` px-2 py-2 rounded text-white font-bold cursor-pointer ${
                              instructor.isBlock ? "bg-red-500" : "bg-green-500"
                            }`}
                          >
                            {instructor.isBlock ? "UnBlock" : "Block"}
                          </button>
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
                              className="bg-purple-600 cursor-pointer text-white"
                              type="button"
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogCancel
                              className="bg-purple-600 cursor-pointer text-white"
                              type="button"
                              onClick={() =>
                                handleBlockInstructor(instructor._id)
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
                  <TableCell colSpan={30} className="text-center font-bold">
                    No Instrors Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminListInstructors);
