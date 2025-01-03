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
  DateRangePicker,
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
import { CalendarIcon, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/Components/ui/textarea";
import { parseDate } from "@internationalized/date";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";

const AdminListCoupon = () => {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [offer, setOffer] = useState(0);
  const [success, setSuccess] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [startingTime, setStartingTime] = useState("");
   const [today] = useState(new Date());
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    offer: false,
    couponCode: false,
    statringDate: false,
    expiryDate: false,
    startingTime: false,
    expiryTime: false,
  });

  
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
    onOpen();
   
    if (title.length < 3 || title.length > 20) {
  
      setErrors((prev) => ({
        ...prev,
        title: true,
      }));
      return
    }

    if (description.length < 3 || description.length > 50) {
      setErrors((prev) => ({
        ...prev,
        description: true,
      }));
     
      return
    }

    if (offer < 20 || offer > 70 || isNaN(offer)) {
      setErrors((prev) => ({
        ...prev,
        offer: true,
      }));
      
      return
    }

  
    if (new Date(startingDate) < today || startingDate.length == 0) {
      setErrors((prev) => ({
        ...prev,
        statringDate: true,
      }));
      ;
      return
    }
    
    if (startingTime.length < 1 ) {
      setErrors((prev) => ({
        ...prev,
        startingTime: true,
      }));
    
      return
    }

    if (expiryDate < startingDate || new Date(expiryDate) < today || startingDate.length == 0) {
      setErrors((prev) => ({
        ...prev,
        expiryDate: true,
      }));
      return
    }

    if (expiryTime.length <1 || startingTime>=expiryTime) {
      setErrors((prev) => ({
        ...prev,
        expiryTime: true,
      }));
      return
    }

    if (couponCode.length < 5 || couponCode.length > 10) {
      setErrors((prev) => ({
        ...prev,
        couponCode: true,
      }));
      return
    }
   console.log(startingDate,expiryDate);
   
    const response = await editCoupon(
      couponId,
      title,
      description,
      offer,
      startingDate,
      startingTime,
      expiryDate,
      expiryTime,
      couponCode
    );
   
    
      if (response.success) {
        setErrors(()=>({
          title:false,
          description:false,
          offer:false,
          statringDate:false,
          startingTime:false,
          expiryDate:false,
          expiryTime:false,
          couponCode:false,
        }))
        const respo = await getCoupons();
        console.log(respo);
        if (respo.success) {
           setCoupons(respo.coupon);
           onClose();
          return toast.success("Edited successfully");
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
                    <TableHead className="text-xs text-left">Name</TableHead>
                    <TableHead className="text-xs text-left">Descriptoin</TableHead>
                    <TableHead className="text-xs text-left">Offer</TableHead>
                    <TableHead className="text-xs text-left ">created date</TableHead>
                    <TableHead className="text-xs text-left">Starting date</TableHead>
                    <TableHead className="text-xs text-left">Expired date</TableHead>
                    <TableHead className="text-xs text-left">Status</TableHead>
                    <TableHead className="text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons?.length > 0 ? (
                    coupons.map((value: ICoupon, index) => (
                      <TableRow key={index}>
                        <TableCell align="left" className="text-xs">{value.title}</TableCell>
                        <TableCell align="left" className="text-xs ">
                          {/* The serene lake reflected the vibrant colors of the
                          sunset, as gentle waves rippled across its surface,
                          creating a calming. */}
                          {value.description}
                        </TableCell>
                        <TableCell align="left"  className="text-xs ">{value.offer}%</TableCell>
                        <TableCell align="left" className="text-xs  ">{value.createdAt.slice(0, 10)}</TableCell>
                        {/* <TableCell>{value.startingDate.slice(0, 10)}</TableCell> */}
                        <TableCell align="left" className="text-xs  ">
                          {value.startingDate?.slice(0, 10)}
                        </TableCell>
                        <TableCell align="left"  className="text-xs ">{value.expiryDate.slice(0, 10)}</TableCell>
                        <TableCell align="left" className="text-xs  ">
                          {value.expiryDate > todaydate ? (
                            <Badge className="bg-success-500">Active</Badge>
                          ) : (
                            <Badge className="bg-danger-500">Expired</Badge>
                          )}
                        </TableCell>
                        <TableCell align="left">
                        <Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreHorizontal />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                             onClick={() => {
                              setTitle(value.title);
                              setDescription(value.description);
                              setOffer(parseInt(value.offer));
                              setCouponCode(value.couponCode);
                              setStartingDate(value.startingDate);
                              setExpiryDate(value.expiryDate);
                              setStartingTime(value.startingTime)
                              setExpiryTime(value.expiryTime)
                              onOpen();
                            }}
                            >
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DialogTrigger asChild>
                              <DropdownMenuItem>
                                Delete
                              </DropdownMenuItem>
                            </DialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              Are you absolutly sure you want to Delee this coupon? this action cannot be un done.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                className="bg-black text-white"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                onClick={() => handleCoupon(value._id!)}
                                className="bg-black text-white"
                              >
                                Continue
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Drawer
                            isOpen={isOpen}
                            size={"4xl"}
                            onClose={onClose}
                          >
                            <DrawerContent>
                              {(onClose) => (
                                <>
                                  <DrawerHeader className="flex flex-col gap-1">
                                    Edit Coupon
                                  </DrawerHeader>
                                  <DrawerBody>
                                    <form>
                                      <div className="d-flex justify-content-between">
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                          <div>
                                            <Label
                                              htmlFor="Title"
                                              className={
                                                errors.title
                                                  ? "text-danger"
                                                  : "text-black"
                                              }
                                            >
                                              Title
                                            </Label>
                                            <Input
                                              type="text"
                                              required
                                              value={title}
                                              className={
                                                errors.title
                                                  ? "border-danger"
                                                  : "border-black"
                                              }
                                              onChange={(e) => {
                                                if (
                                                  e.target.value.length >= 3 &&
                                                  e.target.value.length <= 20
                                                ) {
                                                  setErrors((prev) => ({
                                                    ...prev,
                                                    title: false,
                                                  }));
                                                } else {
                                                  setErrors((prev) => ({
                                                    ...prev,
                                                    title: true,
                                                  }));
                                                }
                                                setTitle(e.target.value);
                                              }}
                                              id="Title"
                                              placeholder="Title"
                                            />
                                            {errors.title ? (
                                              <p className="text-danger font-medium text-xs text-muted-foreground">
                                                Title length should be in
                                                between 3 and 20.
                                              </p>
                                            ) : (
                                              <p className="font-medium text-xs text-muted-foreground">
                                                enter coupon title here.title
                                                length should be in between 3
                                                and 20.
                                              </p>
                                            )}
                                          </div>
                                          <div>
                                            <Label
                                              htmlFor="Deacription"
                                              className={
                                                errors.description
                                                  ? "text-danger"
                                                  : "text-black"
                                              }
                                            >
                                              Deacription
                                            </Label>
                                            <Textarea
                                              className={
                                                errors.description
                                                  ? "border-danger"
                                                  : "border-black"
                                              }
                                              value={description}
                                              required
                                              onChange={(e) => {
                                                if (
                                                  e.target.value.length >= 3 &&
                                                  e.target.value.length <= 50
                                                ) {
                                                  setErrors((prev) => ({
                                                    ...prev,
                                                    description: false,
                                                  }));
                                                } else {
                                                  setErrors((prev) => ({
                                                    ...prev,
                                                    description: true,
                                                  }));
                                                }
                                                setDescription(e.target.value);
                                              }}
                                              maxLength={100}
                                              placeholder="Add your Deacription here."
                                            />
                                            {errors.description ? (
                                              <p className="text-danger font-medium text-xs text-muted-foreground">
                                                Description length should be in
                                                between 3 and 20.
                                              </p>
                                            ) : (
                                              <p className="font-medium text-xs text-muted-foreground">
                                                enter coupon Description
                                                here.Description length should
                                                be in between 3 and 20.
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                          <div>
                                            <div className="w-full max-w-sm items-center space-x-2">
                                              <Label
                                                className={
                                                  errors.offer
                                                    ? "text-danger"
                                                    : "text-black"
                                                }
                                              >
                                                Offer
                                              </Label>
                                              <Input
                                                className={
                                                  errors.offer
                                                    ? "border-danger"
                                                    : "border-black"
                                                }
                                                type="number"
                                                value={offer}
                                                onChange={(e) => {
                                                  let offer = parseInt(
                                                    e.target.value
                                                  );
                                                  if (
                                                    offer >= 20 &&
                                                    offer <= 70
                                                  ) {
                                                    setErrors((prev) => ({
                                                      ...prev,
                                                      offer: false,
                                                    }));
                                                  } else {
                                                    setErrors((prev) => ({
                                                      ...prev,
                                                      offer: true,
                                                    }));
                                                  }
                                                  if (isNaN(offer)) {
                                                    setOffer(20);
                                                    setErrors((prev) => ({
                                                      ...prev,
                                                      offer: false,
                                                    }));
                                                  } else {
                                                    setOffer(offer);
                                                  }
                                                }}
                                                placeholder="Offer"
                                              />
                                              {errors.offer ? (
                                                <p className="text-danger font-medium text-xs text-muted-foreground">
                                                  Offer should be in between 20%
                                                  and 70%.
                                                </p>
                                              ) : (
                                                <p className="font-medium text-xs text-muted-foreground">
                                                  enter coupon Offer here.Offer
                                                  should be in between 20% and
                                                  70%.
                                                </p>
                                              )}
                                            </div>
                                            <div className="flex w-full max-w-sm items-center space-x-2">
                                              <div className="space-y-1">
                                                <Label
                                                  className={
                                                    errors.statringDate
                                                      ? "text-danger "
                                                      : "text-black"
                                                  }
                                                >
                                                  Starting Date
                                                </Label>
                                                <Input
                                                  value={startingDate}
                                                  className={
                                                    errors.statringDate
                                                      ? "border text-danger border-danger"
                                                      : "text-black"
                                                  }
                                                  type="date"
                                                  onChange={(e) => {
                                                    if (
                                                      new Date(e.target.value) >
                                                      today
                                                    ) {
                                                      setErrors((prev) => ({
                                                        ...prev,
                                                        statringDate: false,
                                                      }));
                                                    }
                                                    setStartingDate(
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                               <div>
                                                <Label className={
                                                    errors.startingTime
                                                      ? "text-danger "
                                                      : "text-black"
                                                  } >Starting Time</Label>
                                               <Input
                                                  className={
                                                    errors.startingTime
                                                      ? "border border-danger "
                                                      : "border border-black"
                                                  }
                                                  type="time"
                                                  value={startingTime}
                                                  onChange={(e) => {
                                                    if (
                                                      e.target.value.length > 0
                                                    ) {
                                                      setErrors((prev) => ({
                                                        ...prev,
                                                        startingTime: false,
                                                      }));
                                                    }
                                                    setStartingTime(
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                               </div>
                                              </div>
                                              <div className="space-y-1">
                                                <Label
                                                  className={
                                                    errors.expiryDate
                                                      ? "text-danger "
                                                      : "text-black"
                                                  }
                                                >
                                                  Expiring Date
                                                </Label>
                                                <Input
                                                  value={expiryDate}
                                                  className={
                                                    errors.expiryDate
                                                      ? "text-danger "
                                                      : "text-black"
                                                  }
                                                  type="date"
                                                  
                                                  onChange={(e) => {
                                                    if (
                                                      new Date(e.target.value) >
                                                      today
                                                    ) {
                                                      setErrors((prev) => ({
                                                        ...prev,
                                                        expiryDate: false,
                                                      }));
                                                    } else if (
                                                      expiryDate > startingDate
                                                    ) {
                                                      setErrors((prev) => ({
                                                        ...prev,
                                                        expiryDate: false,
                                                      }));
                                                    }
                                                    setExpiryDate(
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                              <div>
                                              <Label  className={
                                                    errors.expiryTime
                                                      ? " text-danger "
                                                      : " text-black"
                                                  }>Expiring time</Label>
                                              <Input
                                                  type="time"
                                                  value={expiryTime}
                                                  className={
                                                    errors.expiryTime
                                                      ? "border border-danger "
                                                      : "border border-black"
                                                  }
                                                  onChange={(e) => {
                                                    if (
                                                      e.target.value >
                                                      startingTime
                                                    ) {
                                                      setErrors((prev) => ({
                                                        ...prev,
                                                        expiryTime: false,
                                                      }));
                                                    }
                                                    setExpiryTime(
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                              </div>
                                              </div>
                                            </div>
                                            <div className="w-full max-w-sm items-center space-x-2">
                                              <Label
                                                className={
                                                  errors.couponCode
                                                    ? "text-danger"
                                                    : "text-black"
                                                }
                                              >
                                                coupon ID
                                              </Label>
                                              <Input
                                                className={
                                                  errors.couponCode
                                                    ? "border-danger"
                                                    : "border-black"
                                                }
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => {
                                                  if (
                                                    e.target.value.length >=
                                                      5 &&
                                                    e.target.value.length <= 10
                                                  ) {
                                                    setErrors((prev) => ({
                                                      ...prev,
                                                      couponCode: false,
                                                    }));
                                                  } else {
                                                    setErrors((prev) => ({
                                                      ...prev,
                                                      couponCode: true,
                                                    }));
                                                  }
                                                  setCouponCode(
                                                    e.target.value.trim()
                                                  );
                                                }}
                                                placeholder="enter coupon ID"
                                              />
                                              {errors.couponCode ? (
                                                <p className="text-danger font-medium text-xs text-muted-foreground">
                                                  Coupon ID length should be in
                                                  between 5 and 10.
                                                </p>
                                              ) : (
                                                <p className="font-medium text-xs text-muted-foreground">
                                                  enter coupon ID here.Coupon ID
                                                  length should be in between 5
                                                  and 10.
                                                </p>
                                              )}
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
                                            onClick={()=>{
                                               setErrors(()=>({
                                                  title:false,
                                                  description:false,
                                                  offer:false,
                                                  statringDate:false,
                                                  startingTime:false,
                                                  expiryDate:false,
                                                  expiryTime:false,
                                                  couponCode:false                                                  
                                               }))
                                               onClose()
                                            }}
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
