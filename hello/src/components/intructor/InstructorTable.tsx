
import type { ICourse } from "@/@types/courseType";
import type { IUserProfile } from "@/@types/userProfile";
// import type { ICourses } from "@/@types/courseType";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useRequest from "@/hooks/useRequest";
import moment from "moment";
import React, { useState } from "react";

// interface Props {
//   categories: ICategory[];
//   onsendcourse: (courses: ICourse[]) => void;
//   onsendpages: (pages: number) => void;
//   page: number;
// }

type Column<T> = {
  label:string;
  accessor: keyof T;
}
type TableProps<T> = {
  colums:Column<T>[];
  data: T[];
}

const InstructorTable = <T extends object>({ colums, data }: TableProps<T>) => {
  const [search, setSearch] = useState("");
  const [debouns, setDebouns] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

    console.log("table",colums);
    console.log("table",data);

  
  return (
<></>
    // <Table className="border-2 rounded-lg border-black">
    //   <TableCaption>
    //      {datas.length > 0 && (
    //       <Pagination>
    //         <PaginationContent className="gap-10">
    //           <PaginationItem>
    //             <PaginationPrevious
    //               onClick={() => {
    //                 if (page > 1) {
    //                   setPage((prev) => (prev -= 1));
    //                 }
    //               }}
    //               className={`text-black hover:bg-white ${
    //                 page > 1 ? "cursor-pointer" : ""
    //               } `}
    //               size={undefined}
    //             />
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink
    //               size={undefined}
    //               className="text-black border border-black"
    //               isActive
    //             >
    //               {page}
    //             </PaginationLink>
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationNext
    //               size={undefined}
    //               onClick={() => {
    //                 if (page !== totalPage) {
    //                   setPage((prev) => (prev += 1));
    //                 }
    //               }}
    //               className={`text-black hover:bg-white ${
    //                 page < totalPage ? "cursor-pointer" : ""
    //               }`}
    //             />
    //           </PaginationItem>
    //         </PaginationContent>
    //       </Pagination>
    //     )}
    //   </TableCaption>
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead className="text-center">Image</TableHead>
    //       <TableHead className="text-center">Name</TableHead>
    //       <TableHead className="text-center">Email</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {datas.length > 0 ? (
    //       datas?.map((data) => (
    //         <TableRow key={data._id}>
    //           <TableCell className="flex  justify-center">
    //             <Avatar>
    //               <AvatarImage src={data.avatar.avatar_url} alt="@shadcn" />
    //               <AvatarFallback>
    //                 <i className="bi bi-person-fill text-3xl"></i>
    //               </AvatarFallback>
    //             </Avatar>
    //           </TableCell>
    //           <TableCell className="text-center">{data.name}</TableCell>
    //           <TableCell className="text-center">{data.email}</TableCell>
    //           {/* <TableCell className="text-center">
    //             {moment(new Date(data.createdAt)).calendar()}
    //           </TableCell> */}
    //           {/* <TableCell className="text-center">
    //             <AlertDialog>
    //               <AlertDialogTrigger asChild>
    //                 <button
    //                   type="button"
    //                   className={` px-2 py-2 rounded text-white font-bold cursor-pointer ${
    //                     data.isBlock ? "bg-red-500" : "bg-green-500"
    //                   }`}
    //                 >
    //                   {data.isBlock ? "UnBlock" : "Block"}
    //                 </button>
    //               </AlertDialogTrigger>
    //               <AlertDialogContent>
    //                 <AlertDialogHeader>
    //                   <AlertDialogTitle>
    //                     Are you absolutely sure?
    //                   </AlertDialogTitle>
    //                   <AlertDialogDescription>
    //                     This will deney access of this data to enter Eduhub
    //                   </AlertDialogDescription>
    //                 </AlertDialogHeader>
    //                 <AlertDialogFooter>
    //                   <AlertDialogCancel
    //                     className="bg-black-600 cursor-pointer text-white"
    //                     type="button"
    //                   >
    //                     Cancel
    //                   </AlertDialogCancel>
    //                   <AlertDialogCancel
    //                     className="bg-black-600 cursor-pointer text-white"
    //                     type="button"
    //                     // onClick={() => handleBlockStudents(student._id)}
    //                   >
    //                     Continue
    //                   </AlertDialogCancel>
    //                 </AlertDialogFooter>
    //               </AlertDialogContent>
    //             </AlertDialog>
    //           </TableCell> */}
    //         </TableRow>
    //       ))
    //     ) : (
    //       <TableRow>
    //         <TableCell colSpan={30} className="text-center font-bold">
    //           No Students Found
    //         </TableCell>
    //       </TableRow>
    //     )}
    //   </TableBody>
    // </Table>
  );
};

export default React.memo(InstructorTable);
