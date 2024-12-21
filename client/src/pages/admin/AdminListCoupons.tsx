import AdminAside from "@/Components/admin/AdminAside";
import { Card, CardHeader } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  category,
  deleteCoupon,
  editCoupon,
  getCoupons,
  listCategory,
} from "@/Api/admin";

import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/Components/ui/alert-dialog";

import { Badge } from "@/Components/ui/badge";
import { ICoupon } from "@/@types/couponType";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/Components/ui/textarea";

const AdminListCoupon = () => {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [offer, setOffer] = useState(0);
  const [date, setDate] = useState<Date>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllCoupons = async () => {
      const response = await getCoupons();
      if (response.success) {
        setCoupons(response.coupon);
      }
    };
    fetchAllCoupons();
  }, []);

  const handleCoupon = async (couponId: string) => {
    const response = await deleteCoupon(couponId);
    if (response.success) {
      const response = await getCoupons();
      if (response.success) {
        setCoupons(response.coupon);
      }
    }
  };

  const editCouponHandler = async (couponId: string) => {
    onClose;
    const response = await editCoupon(
      couponId,
      title,
      description,
      offer,
      date!,
      couponCode
    );
    if (response.success) {
      const response = await getCoupons();
      if (response.success) {
        setCoupons(response.coupon);
      }
    }
  };
  const todaydate = new Date().toLocaleString();
  return (
    <div className="container-fluid ">
      <div className="row">
        <AdminAside />
        <div className="col-md-10">
          <div className="welcome mt-4 mb-4 bg-purple-600">
            <h1>Welcome back, Admin</h1>
            <img
              src="https://via.placeholder.com/50"
              alt="Profile Picture"
              className="profile-pic"
            />
          </div>
          <div className="grid grid-cols-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <h2>Coupons</h2>

                  <Button onClick={() => navigate("/admin/addCoupon")}>
                    Add Coupon
                  </Button>
                </div>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Descriptoin</TableHead>
                    <TableHead>Offer</TableHead>
                    <TableHead>created date</TableHead>
                    <TableHead>Expired date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons?.length > 0 ? (
                    coupons.map((value: ICoupon, index) => (
                      <TableRow key={index}>
                        <TableCell>{value.title}</TableCell>
                        <TableCell>{value.description}</TableCell>
                        <TableCell>{value.offer}%</TableCell>
                        <TableCell>{value.createdAt.slice(0, 10)}</TableCell>
                        <TableCell>{value.expiryDate.slice(0, 10)}</TableCell>
                        <TableCell>
                          {value.expiryDate > todaydate ? (
                            <Badge className="bg-success-500">Active</Badge>
                          ) : (
                            <Badge className="bg-danger-500">Expired</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center space-x-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                className={"border-danger"}
                                variant="outline"
                                type="button"
                              >
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Do you wnat to Delete this category ?. this
                                  action cannot be undone
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogAction
                                  className="bg-primary text-white"
                                  type="button"
                                >
                                  Cancel
                                </AlertDialogAction>
                                <AlertDialogAction
                                  type="button"
                                  className="bg-primary text-white"
                                  onClick={() => handleCoupon(value._id!)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <Button
                            type="button"
                            onClick={() => {
                              setTitle(value.title)
                              setDescription(value.description)
                              setOffer(parseInt(value.offer));
                              setDate(new Date(value.expiryDate))
                              setCouponCode(value.couponCode)
                              onOpen()
                            }}
                            className=" border-primary"
                            variant="outline"
                          >
                            Edit
                          </Button>
                          <Drawer
                            isOpen={isOpen}
                            size={"4xl"}
                            onClose={onClose}
                          >
                            <DrawerContent>
                              {(onClose) => (
                                <>
                                  <DrawerHeader className="flex flex-col gap-1">
                                    Drawer Title
                                  </DrawerHeader>
                                  <DrawerBody>
                                    <form>
                                      <div className="d-flex justify-content-between">
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                          <Label htmlFor="Title">Title</Label>
                                          <Input
                                            type="text"
                                            required
                                            value={title}
                                            onChange={(e) =>
                                              setTitle(e.target.value)
                                            }
                                            id="Title"
                                            placeholder="Title"
                                          />

                                          <Label htmlFor="Deacription">
                                            Deacription
                                          </Label>
                                          <Textarea
                                            value={description}
                                            required
                                            onChange={(e) =>
                                              setDescription(e.target.value)
                                            }
                                            maxLength={100}
                                            placeholder="Add your Deacription here."
                                          />
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                          <div>
                                            <div className="w-full max-w-sm items-center space-x-2">
                                              <Label>Offer</Label>
                                              <Input
                                                type="number"
                                                value={offer}
                                                onChange={(e) =>
                                                  setOffer(
                                                    parseInt(e.target.value)
                                                  )
                                                }
                                                placeholder="Offer"
                                              />
                                            </div>
                                            <div className=" w-full max-w-sm items-center space-x-2">
                                              <div>
                                                <Label>Date</Label>
                                                <Popover>
                                                  <PopoverTrigger asChild>
                                                    <Button
                                                      variant={"outline"}
                                                      className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !date &&
                                                          "text-muted-foreground"
                                                      )}
                                                    >
                                                      <CalendarIcon />
                                                      {date ? (
                                                        format(date, "PPP")
                                                      ) : (
                                                        <span>Pick a date</span>
                                                      )}
                                                    </Button>
                                                  </PopoverTrigger>
                                                  <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                  >
                                                    <Calendar
                                                      mode="single"
                                                      selected={date}
                                                      onSelect={setDate}
                                                      // initialFocus
                                                    />
                                                  </PopoverContent>
                                                </Popover>
                                              </div>
                                            </div>
                                            <div className="w-full max-w-sm items-center space-x-2">
                                              <Label>coupon ID</Label>
                                              <Input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.trim())}
                                                placeholder="enter coupon ID"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </DrawerBody>
                                  <DrawerFooter>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button color="danger" variant="link">
                                          Close
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Are you absolutely sure?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Do you wnat to Delete this category
                                            ?. this action cannot be undone
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogAction
                                            className="bg-primary text-white"
                                            type="button"
                                            onClick={onOpen}
                                          >
                                            Cancel
                                          </AlertDialogAction>
                                          <AlertDialogAction
                                            type="button"
                                            className="bg-primary text-white"
                                            onClick={onClose}
                                          >
                                            Continue
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button color="danger" variant="link">
                                          Save
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Are you absolutely sure?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to save this
                                            changes?
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogAction
                                            className="bg-primary text-white"
                                            type="button"
                                            onClick={onOpen}
                                          >
                                            Cancel
                                          </AlertDialogAction>
                                          <AlertDialogAction
                                            type="button"
                                            className="bg-primary text-white"
                                            onClick={() =>
                                              editCouponHandler(value._id!)
                                            }
                                          >
                                            Continue
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    {/* <Button color="primary" onClick={onClose}>
                                      Action
                                    </Button> */}
                                  </DrawerFooter>
                                </>
                              )}
                            </DrawerContent>
                          </Drawer>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={20}>
                        No coupons Available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminListCoupon;
