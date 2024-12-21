import AdminAside from "@/Components/admin/AdminAside";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import toast from "react-hot-toast";
import { addCategory, addCoupon } from "@/Api/admin";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

const AdminAddCoupon: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [offer, setOffer] = useState(0);
  const [date, setDate] = React.useState<Date>();
  const [couponId, setCouponId] = useState("");

  const navigate = useNavigate();

  const handleCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
console.log("submit",title,description,offer,date,couponId);
     if(title.length<3){
      return toast.error("title must be in between 3-20 length")
     }

     if(title.length>20){
      return toast.error("title must be in between 3-20 length")
     }
     if(description.length>20){
      return toast.error("description must be in between 3-20 length")
     }
     if(offer<20||offer>70){
      return toast.error("offer must be in between 20%-70% length")
     }
    
     
    const respose = await addCoupon( title,description,offer,date!,couponId);    
    if (respose.success) {
      toast.success(" Coupone added");
      return navigate("/admin/coupon");
    } else {
      toast.error(respose.response.data.message);
    }
  };

 

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
                <div className="d-flex justify-content-between">
                  <h2 className="text-lg font-semibold">Add New Coupon</h2>
                </div>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="d-flex justify-content-between">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="Title">Title</Label>
                      <Input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="Title"
                        placeholder="Title"
                      />

                      <Label htmlFor="Deacription">Deacription</Label>
                      <Textarea
                        value={description}
                        required
                        onChange={(e) => setDiscription(e.target.value)}
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
                            onChange={(e) => setOffer(parseInt(e.target.value))}
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
                                  !date && "text-muted-foreground"
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
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          </div>
                       
                        </div>
                        <div className="w-full max-w-sm items-center space-x-2">
                          <Label>coupon ID</Label>
                          <Input
                            type="text"
                            value={couponId}
                            onChange={(e) => setCouponId(e.target.value.trim())}
                            placeholder="enter coupon ID"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-10">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Back</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You cannot retrieve the informations you entered
                            now. All will remove permenently
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction
                            className="bg-black text-white"
                            type="button"
                          >
                            Cancel
                          </AlertDialogAction>
                          <AlertDialogAction
                            className="bg-black text-white"
                            type="button"
                            onClick={() => navigate(-1)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button type="button">Add Coupon</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This information you provide will add to server of
                            Eduhub
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction
                            className="bg-black text-white"
                            type="button"
                          >
                            Cancel
                          </AlertDialogAction>
                          <AlertDialogAction
                            className="bg-black text-white"
                            type="submit"
                            onClick={(e) => handleCategory(e)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCoupon;
