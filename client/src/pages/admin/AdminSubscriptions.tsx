import { Card, CardContent, CardHeader } from "../../components/ui/card";
import AdminAside from "../../components/admin/AdminAside";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { FormEvent, useEffect, useState } from "react";
import { ISubcription } from "../../@types/subscriptionType";
import {
  getSubscriptions,
} from "../../Api/admin";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import useRequest from "../../hooks/useRequest";
import adminRoutes from "../../service/endPoints/adminEndPoints";

const AdminSubscriptions = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [price, setPrice] = useState("");
  const {doRequest,errors} = useRequest();
  
  const [subscriptionId, setSubscriptionId] = useState("");
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);
  useEffect(() => {
    doRequest({
      url:adminRoutes.subscription,
      body:{},
      method:"get",
      onSuccess:(response)=>{
        setSubscriptions(response.subscriptions);
      }
    });
  }, []);

  const handleSubscription = async () => {
    
    doRequest({
      url:`${adminRoutes.subscription}/${subscriptionId}`,
      body:{},
      method:"delete",
      onSuccess:()=>{
        setSubscriptions(subscriptions.filter((sub)=>sub._id !== subscriptionId));
        return toast.success("successfully deleted.");
      }
    });
  };
   
  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message))
  },[errors]);

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doRequest({
      url:`${adminRoutes.subscription}/${subscriptionId}`,
      body:{price},
      method:"patch",
      onSuccess:async(response)=>{
        console.log(response,"responseresponseresponse");
        const respo = await getSubscriptions();
        setSubscriptions(respo.subscriptions);
        return toast.success("successfully edited.");
      }
    });
  };

  return (
    <div className="flex gap-3">
      <AdminAside />
      <div className="w-full mr-3">
        <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="text-3xl">Welcome back, Admin</span>
        </div>
        <div className="w-full">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <span className="text-2xl font-semibold">Subscriptions</span>

                <Button
                  className="bg-purple-600 hover:bg-purple-400"
                  onClick={() => navigate("/admin/addSubscription")}
                >
                  Add Subscription
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center"> Plan</TableHead>
                    <TableHead className="text-center"> Description</TableHead>
                    <TableHead className="text-center">Created At</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.length > 0 ? (
                    subscriptions.map((value, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{value.price}</TableCell>
                        <TableCell align="center">{value.plan}</TableCell>
                        <TableCell>
                          {value.description.map((val, ind) => (
                            <li key={ind}>{val}</li>
                          ))}
                        </TableCell>
                        <TableCell align="center">
                          {value.createdAt.slice(0, 10)}
                        </TableCell>

                        <TableCell align="center">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <MoreHorizontal />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setPrice(value.price.toString());
                                  setSubscriptionId(value._id);
                                  setIsSheetOpen(true);
                                }}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSubscriptionId(value._id);
                                  setIsAlertOpen(true);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={25} align="center">
                        No subscription Created
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle> Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you absolutly sure you want to Delete this subscription? this
                action cannot be un done.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleSubscription()}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Subscription</DialogTitle>
              <DialogDescription>
                Make changes to your subscription here. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
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
                <DialogFooter>
                <Button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-500"
                    onClick={()=>setIsSheetOpen(false)}
                  >
                    Save
                  </Button>
            </DialogFooter> 
              </div>
            </form>
            
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
