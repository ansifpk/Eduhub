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
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { User } from "@/@types/userType";
import { getCourses, listCourses } from "@/Api/instructor";
import toast from "react-hot-toast";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ICourse } from "@/@types/courseType";

export function Coursestable() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const instructorId = useSelector((state: User) => state.id);

  useEffect(() => {
    const res = async () => {
      const respons = await getCourses(instructorId);
      if(respons.success){
        setCourses(respons.courses);
      }
    };
    res();
  }, []);
console.log(courses,"ji");

  const listingCourses = courses.filter((val: ICourse) =>{
      let arr =  val.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      switch(filter){
        case "New":
        
      }
      return arr
  });

  const handleCourses = async (courseId: string) => {
    const res = await listCourses(courseId);
    if (res.success) {
      const respons = await getCourses(instructorId);
      setCourses(respons);
      if (res.course.isListed) {
        toast.success("Successfully Listed Course");
      } else {
        toast.success("Successfully UnListed Course");
      }
    } else {
      toast.success(res.response.data.message);
    }
  };

  const navigate = useNavigate();

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
            <Button
              className="bg-white text-black"
              onClick={() => navigate("/instructor/createCourse")}
              variant="outline"
            >
              create Course
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <Select onValueChange={(value)=>setFilter(value)}>
          <SelectTrigger id="framework" className="h-8 w-[50px] lg:w-[150px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Old">Old</SelectItem>
            <SelectItem value="Name - A-Z">Name - A-Z</SelectItem>
            <SelectItem value="Name Z-A">Name Z-A</SelectItem>
            <SelectItem value="Price Low - Highy">Price Low - Highy</SelectItem>
            <SelectItem value="Name Highy - Low">Name Highy - Low</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white">
              {listingCourses.length > 0 ? (
                listingCourses.map((val: ICourse, index) => (
                  <TableRow key={index}>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.thumbnail}</TableCell>
                    <TableCell>{val.createdAt.slice(0, 10)}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          val.isListed
                            ? "bg-black text-success"
                            : "bg-black text-danger"
                        }
                      >
                        {val.isListed ? "Listed" : "UnListed"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="bg-black" variant="outline">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56 ">
                          <DropdownMenuItem
                            onClick={() => handleCourses(val._id)}
                          >
                            {val.isListed ? "UnList" : "List"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={()=>navigate(`/instructor/editCourse/${val._id}`)}>Edit</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={20}>
                    No courses Exists
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
