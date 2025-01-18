import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getCourses } from "@/Api/instructor";
import { useSelector } from "react-redux";
import { ICourse } from "@/@types/courseType";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IUser } from "@/@types/chatUser";
import { User } from "@/@types/userType";
import { Pagination, Stack } from "@mui/material";

export function Studentstable() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [students, setStudents] = useState<IUser[]>([]);
  const userId = useSelector((state: User) => state.id);
 

  useEffect(() => {
    const stude = async () => {
      const response = await getCourses(userId,search,sort);
      if (response.success) {
        const uniqueStudents: IUser[] = Array.from(
          new Map<string, IUser>(
            response?.courses
              ?.flatMap((course: ICourse) => course.students) 
              .map((student: IUser) => [student._id, student]) 
          ).values() 
        );

        setStudents(uniqueStudents);
      }
    };
    stude();
  }, [userId,search,sort]);
  console.log(students, "students");

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
                className="h-10 w-[50px] lg:w-[150px] text-black"
                
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
                <TableHead>image</TableHead>
                <TableHead>email</TableHead>
                <TableHead>name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white">
              {students.length > 0 ? (
                students.map((student,index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={
                            student.avatar?.avatar_url ||
                            "https://github.com/shadcn.png"
                          }
                          alt={student.name || "Student"}
                        />
                        <AvatarFallback>
                          {student.name?.[0] || "SC"}
                        </AvatarFallback>
                      </Avatar>
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
          {/* <Stack className="flex items-center justify-center" spacing={2}>
              <div>
                        <Pagination count={totalPage} page={page} onChange={handleChange} />
                    </div>
          </Stack> */}
        </div>
      </div>
    </>
  );
}
