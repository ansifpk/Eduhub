import type { IUserProfile } from "@/@types/userProfile";
import type { IUser } from "@/@types/userType";
import AppSidebar from "@/components/AppSidebar";
import InstructorTable from "@/components/intructor/InstructorTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useRequest from "@/hooks/useRequest";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const headers = ["image","name","email"];

const InstructorListStudents = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [students, setStudents] = useState<IUserProfile[]>([]);
  const userId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();
 
  useEffect(() => {
    // doRequest({
    //   url: `${instructorRoutes.students}?instructorId=${userId}&&search=${search}&&sort=${sort}`,
    //   method: "get",
    //   body: {},
    //   onSuccess: (response) => {
    //     setStudents(response.students);
    //   },
    // });
  }, [userId, search, sort]);

  console.log("list studne");


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
                  onChange={(e) => setSearch(e.target.value)}
                  className="md:w-[100px]  lg:w-[300px] border border-black py-1 px-2 rounded  text-muted-foreground"
                />
              </div>
              <Select onValueChange={(value) => setSort(value)}>
                <SelectTrigger
                  id="framework"
                  className=" border-black w-[50px] lg:w-[150px] text-white"
                >
                  <SelectValue placeholder="Sort" />
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
           <button onClick={()=>setSort("green")} >green</button>
           <button onClick={()=>setSort("red")} >red</button>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default React.memo(InstructorListStudents);
