import useRequest from "@/hooks/useRequest";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import type { ICategory } from "@/@types/categoryType";
import { Loader2Icon, MoreHorizontal } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import {
  categorySchema,
  type CategoryFormInputs,
} from "@/util/schemas/categoryScheema";
import { zodResolver } from "@hookform/resolvers/zod";

const AdminListCategory = () => {
  const [search, setSearch] = useState("");
  const [debouns, setDebouns] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [deleteConfim, setDeleteConfim] = useState(false);
  const [edit, setEdit] = useState(false);
  const [laoding, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const topicRef = useRef<HTMLInputElement>(null);
  const { doRequest, err } = useRequest();


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      description: "",
      topics: [],
    },
  });

  useEffect(() => {
    doRequest({
      url: adminRoutes.category,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setCategories(response);
        setTotalPage(3)
      },
    });
  }, [search,sort]);

    useEffect(() => {
      const intervel = setTimeout(() => {
        setSearch(debouns);
      }, 600);
      return () => {
        clearTimeout(intervel);
      };
    }, [debouns]);

 
  const handleListing = (categoryId: string) => {
    doRequest({
      url: `${adminRoutes.listCategory}/${categoryId}`,
      method: "patch",
      body: {},
      onSuccess: (response) => {
        doRequest({
          url: adminRoutes.category,
          method: "get",
          body: {},
          onSuccess: (respo) => {
            setCategories(respo);
            if (response.data.isListed) {
              toast.success("Successfully UnListed Category");
            } else {
              toast.success("Successfully Listed Category");
            }
          },
        });
      },
    });
  };

  const handleEdit = (data: CategoryFormInputs) => {
     setLoading(true)
    doRequest({
      url:adminRoutes.editCategory,
      body:{ _id: categoryId, title:data.title, description:data.description, topics:data.topics },
      method:"patch",
      onSuccess:()=>{
        doRequest({
            url: adminRoutes.category,
            method: "get",
            body: {},
            onSuccess: (response) => {
                setCategories(response);
                setEdit(false)
                 setLoading(false)
                toast.success(" Category edited");
            },
        });
      }
    })
  };

  const handleTopic = async () => {
    const topics = watch("topics");
    if (topicRef.current!.value.length == 0) {
      return;
    }
    if (topics.includes(topicRef.current!.value)) {
      return toast.error("This topic already includes");
    }
    if (topics.length < 8) {
      topics.push(topicRef.current!.value);
      topicRef.current!.value = "";
      setValue("topics", topics);
      toast.success("sub Category added");
    } else {
      toast.error("maximum limite exceeded");
    }
  };

  const handleDeleteTopic = (index: number) => {
    let topics = watch("topics");
    topics = topics.filter((_value, i) => i !== index);
    setValue("topics", topics);
    toast.success("sub Category removed");
  };

  useEffect(() => {
    setLoading(false)
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div className="w-[80%] ml-auto">
      <div className="px-5 flex flex-col space-y-5">
        <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="font-bold text-3xl">Welcome back, Admin</span>
        </div>
        <div>
          <div className="flex justify-between my-3 ">
            <span className="text-lg font-bold underline">List Categories</span>
            <div className="flex space-x-5">
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setDebouns(e.target.value)}
                className="md:w-[200px] border border-purple-600 p-1 rounded lg:w-[300px] "
              />
              <Select onValueChange={(value) => setSort(value)}>
                <SelectTrigger className="w-[100px] border border-purple-600">
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

          <Table className="border-2 table-auto rounded-lg border-purple-600">
            <TableCaption>
              {categories.length > 0 && (
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
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Descriptoin</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center"> Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell className="flex  justify-center">
                      {category.title}
                    </TableCell>
                    <TableCell className="text-start">
                      {category.description}
                    </TableCell>
                    <TableCell className="text-center">
                      {moment(new Date(category.createdAt)).calendar()}
                    </TableCell>
                    <TableCell className="text-center ">
                      <span
                        className={` rounded-full px-2  text-white font-semibold ${
                          category.isListed ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {category.isListed ? "List" : "unList"}
                      </span>
                    </TableCell>
                    <TableCell className=" flex justify-center-safe ">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setEdit(true);
                            setValue("title",category.title)
                            setValue("description",category.description)
                            setValue("topics",category.topics)
                            setCategoryId(category._id!)
                          }}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteConfim(true)}
                          >
                            {category.isListed ? "UnList" : "List"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialog
                        open={deleteConfim}
                        onOpenChange={setDeleteConfim}
                      >
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will change this data and store to our
                              servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-purple-600 text-white cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-purple-600 text-white cursor-pointer hover:bg-white hover:text-black"
                              onClick={() => handleListing(category._id!)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Sheet open={edit} onOpenChange={setEdit}>
                        <SheetContent side="bottom" className="h-screen">
                          <SheetHeader>
                            <SheetTitle>Edit Category</SheetTitle>
                            <SheetDescription>
                              Make changes to category here.
                              Click save when you're done.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid flex-1 auto-rows-min gap-6 px-4  mx-5">
                            <Card>
                              <CardContent>
                                <form className="grid grid-cols-2 space-x-5">
                                  <div className="space-y-5">
                                    <div className="flex flex-col space-y-2">
                                      <label htmlFor="title">Title</label>
                                      <input
                                        {...register("title")}
                                        id="title"
                                        type="text"
                                        placeholder="Enter title"
                                        className="px-2 py-1 rounded-md border border-purple-500"
                                      />
                                      {errors.title && (
                                        <p className="text-red-500">
                                          {errors.title.message}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                      <label htmlFor="description">
                                        Discription
                                      </label>
                                      <textarea
                                        {...register("description")}
                                        id="description"
                                        placeholder="Enter Discription"
                                        className="p-2 rounded-md h-30 border border-purple-500"
                                      />
                                      {errors.description && (
                                        <p className="text-red-500">
                                          {errors.description.message}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="space-y-5">
                                      <div className="flex flex-col w-full space-y-2">
                                        <label htmlFor="topics">Topics</label>

                                        <div className="w-full space-x-5">
                                          <input
                                            id="topics"
                                            type="text"
                                            ref={topicRef}
                                            placeholder="Enter title"
                                            className="px-2 py-1 w-[80%] rounded-md border border-purple-500"
                                          />
                                          <button
                                            type="button"
                                            onClick={handleTopic}
                                            className="bg-purple-500 px-2 py-1 rounded text-white font-semibold cursor-pointer"
                                          >
                                            Add
                                          </button>
                                        </div>
                                        {errors.topics && (
                                          <p className="text-red-500">
                                            {errors.topics.message}
                                          </p>
                                        )}
                                        <ScrollArea className="border rounded-md border-purple-500 h-50">
                                          <div className="p-4">
                                            <h4 className="mb-4 text-sm  leading-none font-medium">
                                              Topics
                                            </h4>
                                            {watch("topics").map(
                                              (topic, index) => (
                                                <div key={topic + index}>
                                                  <div className="flex justify-between text-sm">
                                                    <span>{topic}</span>
                                                    <span
                                                      className="cursor-pointer"
                                                      onClick={() =>
                                                        handleDeleteTopic(index)
                                                      }
                                                    >
                                                      X
                                                    </span>
                                                  </div>
                                                  <Separator className="my-2" />
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </ScrollArea>
                                      </div>
                                      <div className="flex flex-col space-y-2"></div>
                                    </div>
                                  </div>
                                </form>
                              </CardContent>
                            </Card>
                          </div>
                          <SheetFooter>
                            <div className="flex gap-5 justify-end-safe w-full">
                              <AlertDialog>
                                <AlertDialogTrigger asChild className="bg-purple-600 px-2 py-1 cursor-pointer rounded text-white font-bold">
                                {
                                    laoding ? 
                                    <span className="flex items-center-safe"  >
                                     loading..
                                     <Loader2Icon className="animate-spin size-4" />
                                    </span>
                                    : <span> Save changes</span>
                                }
                                 
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will save the changes to our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-purple-600 cursor-pointer px-2 py-1 rounded text-white font-bold">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-purple-600 hover:bg-white hover:text-black cursor-pointer px-2 py-1 rounded text-white font-bold"
                                      onClick={() =>
                                        handleSubmit((data) =>
                                          handleEdit(data)
                                        )()
                                      }
                                    >
                                        
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              <SheetClose asChild>
                                <button className="bg-purple-600 cursor-pointer px-2 py-1 rounded text-white font-bold">
                                  Close
                                </button>
                              </SheetClose>
                            </div>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={30} className="text-center font-bold">
                    No category found
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

export default React.memo(AdminListCategory);
