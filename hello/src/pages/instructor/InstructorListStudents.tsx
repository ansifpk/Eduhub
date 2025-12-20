import type { IUserProfile } from "@/@types/userProfile";
import type { IUser } from "@/@types/userType";
import AppSidebar from "../../components/AppSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import useRequest from "@/hooks/useRequest";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import React, { useEffect,  useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";



const InstructorListStudents = () => {
  const [search, setSearch] = useState("");
  const [debouns, setDebuns] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [students, setStudents] = useState<IUserProfile[]>([]);
  const userId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();
 
  useEffect(() => {
    doRequest({
      url: `${instructorRoutes.students}?instructorId=${userId}&&search=${search}&&sort=${sort}&&page=${page}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setTotalPage(response.students[0].totalPage);
        setStudents(response.students[0].data);
      },
    });
  }, [userId, search, sort,page]);

  useEffect(() => {
      const intervel = setTimeout(() => {
        setSearch(debouns);
      }, 600);
      return () => {
        clearTimeout(intervel);
      };
  }, [debouns]);



  useEffect(()=>{
    err?.map((err)=>toast.error(err.message));
  },[err]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <div className="p-2  space-y-2">
          <div className="flex items-center-safe justify-between-safe">
            <div className="text-black">
              <h2 className="text-2xl font-bold tracking-tight underline">
                Students
              </h2>
              <p className="text-muted-foreground">
                Here is the list of courses of your...
              </p>
            </div>
          </div>

          <div className="flex justify-end ">
            <div className="text-white flex gap-2">
              <div>
                <input
                  type="search"
                  placeholder="Search..."
                  onChange={(e) => setDebuns(e.target.value)}
                  className=" border border-black py-1 px-2 rounded  text-muted-foreground"
                />
              </div>
              <Select onValueChange={(value) => setSort(value)}>
                <SelectTrigger
                  id="framework"
                  className=" border-black w-[150px] text-black"
                >
                  <SelectValue placeholder="Sort..." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Old">Old</SelectItem>
                  <SelectItem value="Name A-Z">Name A-Z</SelectItem>
                  <SelectItem value="Name Z-A">Name Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
           {/* <InstructorTable users={students} headers={headers}  /> */}
           <Table className="border-2 rounded-lg border-black">
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
                        className={`text-black hover:bg-white ${
                          page > 1 ? "cursor-pointer" : ""
                        } `}
                        size={undefined}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        size={undefined}
                        className="text-black border border-black"
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
                        className={`text-black hover:bg-white ${
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
                <TableHead className="text-center">email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length > 0 ? (
                students?.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell className="flex  justify-center">
                      <Avatar>
                        <AvatarImage
                          src={student?.avatar.avatar_url}
                          alt="shadcn"
                        />
                        <AvatarFallback>
                          <i className="bi bi-person-fill text-3xl"></i>
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-center">
                      {student?.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {student?.email}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={30} className="text-center font-bold">
                    No students Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default React.memo(InstructorListStudents);
