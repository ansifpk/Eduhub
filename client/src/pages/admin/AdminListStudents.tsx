import type { IUserProfile } from "@/@types/userProfile";
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
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select";
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

const AdminListStudents = () => {
  
  const [students, setStudents] = useState<IUserProfile[]>([]);
  const [search, setSearch] = useState("");
  const [debouns, setDebouns] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const socket = useSocket()
  console.log('socket',socket)
  const { doRequest, err } = useRequest();

  const handleBlockStudents = (userId: string) => {
    doRequest({
      url: `${adminRoutes.blockUser}/${userId}`,
      method:"patch",
      body:{},
      onSuccess:(res)=>{

        doRequest({
          url:`${adminRoutes.students}?search=${search}&&sort=${sort}&&page=${page}`,
          method:"get",
          body:{},
          onSuccess:(response)=>{
            setStudents(response.students);
            setTotalPage(response.pages);
            if(res.data.isBlock){
               socket?.emit(`blockUser`,userId)
               toast.success("Successfully Block User");
            }else{
               toast.success("Successfully UnBLock User");
            } 
          }
        })
      }
    });
  };

  useEffect(() => {
    doRequest({
      url: `${adminRoutes.students}?search=${search}&&sort=${sort}&&page=${page}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setStudents(response.students);
        setTotalPage(response.pages);
      },
    });
  }, [search, sort, page]);

  useEffect(() => {
    const intervel = setTimeout(() => {
      setSearch(debouns);
    }, 600);
    return () => {
      clearTimeout(intervel);
    };
  }, [debouns]);
  
  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div className="w-[80%] ml-auto">
      <div className="px-5 flex flex-col space-y-5">
        <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="font-bold text-3xl">Welcome back, Admin</span>
        </div>

        <div className="space-y-5" >
          <div className="flex justify-between" >
            <span className="text-3xl font-bold underline">List Students</span>
            <div className="flex gap-2">
               <input type="search" onChange={(e)=>setDebouns(e.target.value)}  className="border rounded py-1 px-2 border-purple-600" placeholder="Search students here..." />
                <Select  onValueChange={(value) => setSort(value)}>
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
            </div>
          </div>
          <Table className="border-2 rounded-lg border-purple-600">
            <TableCaption>
              {students.length > 0 && (
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
              {students.length > 0 ? (
                students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell className="flex  justify-center">
                      
                        <Avatar>
                          <AvatarImage
                            src={student.avatar.avatar_url}
                            alt="@shadcn"
                          />
                          <AvatarFallback><i className="bi bi-person-fill text-3xl"></i></AvatarFallback>
                        </Avatar>
                      
                    </TableCell>
                    <TableCell className="text-center">{student.name}</TableCell>
                    <TableCell className="text-center">{student.email}</TableCell>
                    <TableCell className="text-center">{moment(new Date(student.createdAt)).calendar()}</TableCell>
                    <TableCell className="text-center">
                      <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                type="button"
                                className={
                                  
                                 ` px-2 py-2 rounded text-white font-bold cursor-pointer ${student.isBlock
                                    ? "bg-red-500"
                                    : "bg-green-500"}`
                                }
                              >
                                {student.isBlock ? "UnBlock" : "Block"}
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
                                    handleBlockStudents(student._id)
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
                    No Students Found
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

export default React.memo(AdminListStudents);
