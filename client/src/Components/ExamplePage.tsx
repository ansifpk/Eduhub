import { useEffect, useState } from "react";
import { IUser } from "@/@types/chatUser";
import { ICourse } from "@/@types/courseType";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useRequest from "@/hooks/useRequest";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function ExamplePage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [topCourses, setTopCourses] = useState<ICourse[]>([]);
  const { doRequest, errors } = useRequest();

  const navigate = useNavigate();
  useEffect(() => {
    doRequest({
      url: adminRoutes.course,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setCourses(response);
      },
    });
    doRequest({
      url: adminRoutes.top5Instructors,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setUsers(response);
      },
    });
    doRequest({
      url: adminRoutes.top5RatedCourse,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setTopCourses(response);
      },
    });
  }, []);
  useEffect(() => {
    errors?.map((err) => toast.error(err.message));
  }, [errors]);
  return (
    <>
     

      <Dialog>
        
        <DropdownMenu>
          <DropdownMenuTrigger >
            <Button variant="outline">Open</Button>
          </DropdownMenuTrigger>
          
          <Sheet>
          <DropdownMenuContent className="w-56">
            <DropdownMenuCheckboxItem  >
            <SheetTrigger >
                 SHEERT
            </SheetTrigger>
           
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuCheckboxItem>
            <DialogTrigger>
            diLOH
            </DialogTrigger>
            </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
            <SheetContent side={"bottom"} className="h-screen ">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
            </Sheet>
        </DropdownMenu>
      
            
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
       
        </Dialog>
     
   
       
        
   
    </>
  );
}
