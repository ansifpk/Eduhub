import AdminAside from "../../components/admin/AdminAside";
import { Card,  } from "../../components/ui/card";
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
import moment from "moment";
import { IUser } from "../../@types/chatUser";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useSocket } from "../../context/socketContext";
import useRequest from "../../hooks/useRequest";
import adminRoutes from "../../service/endPoints/adminEndPoints";
import { Pagination, PaginationContent,  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../components/ui/pagination";

const AdminListStudents = () => {
  const [student, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const socket = useSocket()
  const {doRequest,errors} = useRequest();

  useEffect(() => {
    doRequest({
      url:`${adminRoutes.students}?search=${search}&&sort=${sort}&&page=${page}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        setStudents(response.students);
        setTotalPage(response.pages);
      }
    })
   }, [search,sort,page]);


  const handleBlockStudents = async (userId: string) => {
    doRequest({
      url: `${adminRoutes.blockUser}/${userId}`,
      method:"patch",
      body:{},
      onSuccess:(response)=>{
       if(response.data.isBlock){
        doRequest({
          url:`${adminRoutes.students}?search=${search}&&sort=${sort}&&page=${page}`,
          method:"get",
          body:{},
          onSuccess:(response)=>{
            setStudents(response.students);
            setTotalPage(response.pages);
            socket?.emit(`blockUser`,userId)
            toast.success("Successfully Block User");
          }
        })
       }else{
        doRequest({
          url:`${adminRoutes.students}?search=${search}&&sort=${sort}&&page=${page}`,
          method:"get",
          body:{},
          onSuccess:(response)=>{
            setStudents(response.students);
            setTotalPage(response.pages);
            toast.success("Successfully UnBLock User");
          }
        })
       }
      }
    });

  };
  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message))
  },[errors]);

  
  
  return (
    <div className="flex gap-2">
      <AdminAside />
      <div className="w-full mr-3">
        <div className="w-full mx-auto mt-2 rounded-lg p-5   text-white bg-purple-600">
        <span className="text-3xl">Welcome back, Admin</span>
        </div>
        <div className="w-full">
            <div className="flex justify-between my-3 ">
               <h1 className="text-lg font-bold">Students</h1>
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
               </div>
            </div>
            {/* table card  */}
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] ">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.length > 0 ? (
                    student.map((value: IUser, index) => (
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
                        <TableCell>
                          {moment(new Date(value.createdAt)).calendar()}
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                type="button"
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
                                    handleBlockStudents(value._id!)
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
                      <TableCell
                        align="center"
                        colSpan={20}
                        className="font-medium"
                      >
                        No Students Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div>
              <Pagination>
                <PaginationContent className="gap-5">
                  <PaginationItem>
                    <PaginationPrevious  onClick={() => {
                      if (page > 1) {
                        setPage((prev) => prev -= 1);
                      }
                    } } className={`text-black ${page > 1 ? "cursor-pointer" : ""} `} size={undefined} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink size={undefined} className="text-black"  isActive>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext size={undefined}  onClick={()=>{
                       if(page !==totalPage){
                        setPage((prev)=>prev+=1)
                      }
                      }} className={`text-black ${page<totalPage?"cursor-pointer":""}`} />
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

export default AdminListStudents;
