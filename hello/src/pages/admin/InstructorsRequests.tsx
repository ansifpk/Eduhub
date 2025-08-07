import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useRequest from "@/hooks/useRequest";
import type { IUserProfile } from "@/@types/userProfile";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const InstructorsRequests = () => {
  const [instructors, setInstructors] = useState<IUserProfile[]>([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { doRequest, err } = useRequest();

  useEffect(() => {
    doRequest({
      url: `${adminRoutes.instructorRequest}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setInstructors(response);
        setTotalPage(response.pages);
      },
    });
  }, []);

 const handleApproval = async (email: string, status: string) => {
    doRequest({
      url: adminRoutes.instructorAprovel,
      method: "patch",
      body: { email, status },
      onSuccess: () => {
        doRequest({
          url: `${adminRoutes.instructorRequest}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setInstructors(response);
          },
        });
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
        <div>
          <div className="flex w-full justify-between gap-4 my-3 items-center">
            <div className="flex w-full gap-4 items-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-purple-600 px-4 rounded text-white py-1 hover:bg-purple-600"
              >
                <i className="bi bi-arrow-left"></i>
              </button>
              <h1 className="text-3xl font-bold underline">
                Instructor Requests
              </h1>
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
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructors.length > 0 ? (
                instructors.map((instructor) => (
                  <TableRow key={instructor._id}>
                    <TableCell className="font-medium">
                      <Avatar>
                        <AvatarImage
                          src={instructor.avatar.avatar_url}
                          alt="@shadcn"
                        />
                        <AvatarFallback>
                          <i className="bi bi-person-fill text-3xl"></i>
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{instructor.name}</TableCell>
                    <TableCell>{instructor.email}</TableCell>
                    <TableCell>
                      <div className="grid grid-cols-2 gap-2">
                        <Sheet key={"top"}>
                          <SheetTrigger asChild>
                            <button
                              className={"bg-purple-600 hover:bg-purple-600"}
                            >
                              View Detailes
                            </button>
                          </SheetTrigger>
                          <SheetContent side={"top"}>
                            <SheetHeader>
                              <SheetTitle>
                                User Request to become an Instructor
                              </SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="name" className="text-right">
                                  Name
                                </label>
                                <input
                                  id="name"
                                  value={instructor.name}
                                  className="col-span-3"
                                  onChange={() => ""}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  Email
                                </label>
                                <input
                                  onChange={() => ""}
                                  id="username"
                                  value={instructor.email}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  Qualification
                                </label>
                                <input
                                  onChange={() => ""}
                                  id="username"
                                  value={instructor.qualification}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  Expirience
                                </label>
                                <input
                                  onChange={() => ""}
                                  id="username"
                                  value={instructor.experience}
                                />
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button>View Certificate</button>
                                  </DialogTrigger>
                                  <DialogTitle>
                                    <DialogContent className="sm:max-w-[600px]">
                                      <div className="grid gap-4 py-4">
                                        <img
                                          src={
                                            instructor.certificate
                                              .certificate_url
                                          }
                                          alt="certificate image"
                                        />
                                      </div>
                                    </DialogContent>
                                  </DialogTitle>
                                </Dialog>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  CV
                                </label>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button>View CV</button>
                                  </DialogTrigger>
                                  <DialogTitle>
                                    <DialogContent className="sm:max-w-[600px]">
                                      <div className="grid gap-4 py-4">
                                        <img
                                          src={instructor.cv.cv_url}
                                          alt="certificate image"
                                        />
                                      </div>
                                    </DialogContent>
                                  </DialogTitle>
                                </Dialog>
                              </div>
                            </div>
                            <SheetFooter>
                              <SheetClose asChild>
                                <div className="flex gap-4">
                                  <button
                                    className="bg-red-500"
                                    onClick={() =>
                                      handleApproval(
                                        instructor.email,
                                        "Rejected"
                                      )
                                    }
                                    type="button"
                                  >
                                    Reject
                                  </button>
                                  <button
                                    className="bg-green-500"
                                    onClick={() =>
                                      handleApproval(
                                        instructor.email,
                                        "Approved"
                                      )
                                    }
                                    type="button"
                                  >
                                    Approv
                                  </button>
                                </div>
                              </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={30} className="text-center font-bold">
                    No Penidng requests!.
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

export default React.memo(InstructorsRequests);
