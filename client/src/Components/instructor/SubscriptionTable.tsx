import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { useSelector } from "react-redux";
import { FormEvent, useEffect, useState } from "react";
import { User } from "../../@types/userType";
import {
  editSubscription,
  getInstructorSubscriptions,
} from "../../Api/instructor";
import toast from "react-hot-toast";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { ISubcription } from "../../@types/subscriptionType";
import { MoreHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

export function SubscriptionTable() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  // const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const instructorId = useSelector((state: User) => state.id);
  const [price, setPrice] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const res = async () => {
      const data = await getInstructorSubscriptions(instructorId);
      if (data.success) {
        setSubscriptions(data.subscriptions);
      } else if (data.status == 403) {
        toast.error("You are blocked by admin");
        return navigate("/instructor/login");
      } else {
        return toast.error(data.response.data.message);
      }
    };
    res();
  }, [sort]);

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await editSubscription(subscriptionId, parseInt(price));
    if (response.success) {
      const data = await getInstructorSubscriptions(instructorId);
      if (data.success) {
        setSubscriptions(data.subscriptions);
        return toast.success("successfully edited.");
      } else if (data.status == 403) {
        toast.error("You are blocked by admin");
        return navigate("/instructor/login");
      } else {
        return toast.error(data.response.data.message);
      }
    } else if (response.status == 403) {
      toast.error(response.response.data.message);
      return navigate("/instructor/login");
    } else {
      return toast.error(response.response.data.message);
    }
  };

  return (
    <>
      <div className="flex  items-center justify-between space-y-2 w-full">
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
                // onChange={(e) => setSearch(e.target.value)}
                className="md:w-[100px] lg:w-[300px] bg-black text-white"
              />
            </div>
            <Button
              className="bg-white text-black"
              onClick={() => navigate("/instructor/createSubscription")}
              variant="outline"
            >
              Create Subscription
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <Select onValueChange={(value) => setSort(value)}>
          <SelectTrigger id="framework" className="h-8 lg:w-[200px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Old">Old</SelectItem>
            <SelectItem value="Price Low - High">Price Low - High</SelectItem>
            <SelectItem value="Price High - Low">Price High - Low</SelectItem>
            <SelectItem value="Name High - Low">Name High - Low</SelectItem>
            <SelectItem value="Name Low - High">Name Low - High</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Price</TableHead>
                <TableHead className="text-white">Description</TableHead>
                <TableHead className="text-white">Plan</TableHead>
                <TableHead className="text-white">Created At</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white">
              {subscriptions.length > 0 ? (
                subscriptions.map((val: ISubcription) => (
                  <TableRow>
                    <TableCell>{val.price}</TableCell>
                    <TableCell>{val.description.join(",")}</TableCell>
                    <TableCell>{val.plan}</TableCell>
                    <TableCell>{val.createdAt.slice(0, 10)}</TableCell>
                    <TableCell align="center">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                          
                            onClick={() => {
                              setPrice(val.price.toString());
                              setSubscriptionId(val._id);
                              setIsSheetOpen(true)
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={20}>
                    No Subscriptions created
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent className="h-screen" side="bottom">
              <SheetHeader>
                <SheetTitle>Edit Subscription</SheetTitle>
                <SheetDescription>
                  Manage your subscription and payment methods.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={(e) => handleEdit(e)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Price
                    </Label>
                    <Input
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                      id="name"
                      value={price}
                      className="col-span-3"
                    />
                  </div>
                  <SheetFooter className="flex justify-center">
                  <Button
                    type="submit"
                    className="bg-purple-500 w-50 cursor-pointer hover:bg-purple-500"
                  >
                    Save
                  </Button>
                  </SheetFooter>
                  
                </div>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
