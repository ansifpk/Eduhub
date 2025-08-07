
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import { ICourse } from "../../@types/courseType";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "../../@types/chatUser";
import { User } from "../../@types/userType";
import instructorRoutes from "../../service/endPoints/instructorEndPoints";
import useRequest from "../../hooks/useRequest";
import toast from "react-hot-toast";


export function Studentstable() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [students, setStudents] = useState<IUser[]>([]);
  const userId = useSelector((state: User) => state.id);
 const {doRequest,errors} = useRequest();

  useEffect(() => {
    
    doRequest({
      url:`${instructorRoutes.getCourses}?instructorId=${userId}&&search=${search}&&sort=${sort}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        const uniqueStudents: IUser[] = Array.from(
          new Map<string, IUser>(
            response?.courses
              ?.flatMap((course: ICourse) => course.students) 
              .map((student: IUser) => [student._id, student]) 
          ).values() 
        );

        setStudents(uniqueStudents);
      }
    });
  }, [userId,search,sort]);
 
  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message));
  },[errors]);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <div className="text-white">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here is the list of courses of your...
            </p>
          </div>
        </div>
        <div>
          <div className="text-white flex gap-2">
            <div>
              <Input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="md:w-[100px] lg:w-[300px] bg-black text-white"
              />
            </div>
            <Select onValueChange={(value) => setSort(value)}>
              <SelectTrigger
                id="framework"
                className="h-10 w-[50px] lg:w-[150px] text-white"
                
              >
                <SelectValue placeholder="Filter" />
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
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">image</TableHead>
                <TableHead className="text-white">name</TableHead>
                <TableHead className="text-white">email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white">
              {students.length > 0 ? (
                students.map((student,index) => (
                  <TableRow key={index}>
                    <TableCell>
                      
                        {
                          student.avatar?.avatar_url?
                              <Avatar className="h-9 w-9">
                              <AvatarImage
                              src={
                                student.avatar?.avatar_url 
                              }
                              alt={student.name || "Student"}
                              />
                              <AvatarFallback>
                              {student.name?.[0] || "SC"}
                            </AvatarFallback>
                          </Avatar>
      
                          
                          :
                          <i className="bi bi-person-circle text-2xl"></i>
                        }
                       
                        
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>You dont have any students</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
