import type { ISubcription } from "@/@types/subscriptionType";
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
} from "../../components/ui/alert-dialog";
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
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import useRequest from "@/hooks/useRequest";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import {
  subscriptionSchema,
  type SubscriptionFormInputs,
} from "@/util/schemas/subscriptionScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminSubscription = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);
//   const navigate = useNavigate();
  const { doRequest, err } = useRequest();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubscriptionFormInputs>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      price: "",
    },
  });

  useEffect(() => {
    doRequest({
      url: adminRoutes.subscription,
      body: {},
      method: "get",
      onSuccess: (response) => {
        setSubscriptions(response.subscriptions);
      },
    });
  }, []);

  const handleEdit = async (data: SubscriptionFormInputs) => {

    setIsAlertOpen(false);
    doRequest({
      url: `${adminRoutes.subscription}/${subscriptionId}`,
      body: { price: data.price },
      method: "patch",
      onSuccess: async () => {
        doRequest({
          url: adminRoutes.subscription,
          body: {},
          method: "get",
          onSuccess: (response) => {
            setSubscriptions(response.subscriptions);
            return toast.success("successfully edited.");
          },
        });
      },
    });
  };

  const handleSubscription = async () => {
    doRequest({
      url: `${adminRoutes.subscription}/${subscriptionId}`,
      body: {},
      method: "delete",
      onSuccess: () => {
        setSubscriptions(
          subscriptions.filter((sub) => sub._id !== subscriptionId)
        );
        return toast.success("successfully deleted.");
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

        <div className="">
          <div className="flex justify-between">
            <span className="text-3xl font-bold underline">
              List Subscriptions
            </span>
          </div>
          <Table className="border-2 rounded-lg border-purple-600">
            <TableCaption></TableCaption>
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
                subscriptions.map((subscription) => (
                  <TableRow key={subscription._id}>
                    <TableCell align="center">{subscription.price}</TableCell>
                    <TableCell align="center">{subscription.plan}</TableCell>
                    <TableCell>
                      {subscription.description.map((val, ind) => (
                        <li key={ind}>{val}</li>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {subscription.createdAt.slice(0, 10)}
                    </TableCell>

                    <TableCell align="center">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                  
                          <DropdownMenuItem
                            onClick={() => {
                              setValue("price", subscription.price.toString());
                              setSubscriptionId(subscription._id);
                              setIsSheetOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem
                            onClick={() => {
                              setSubscriptionId(subscription._id);
                              setIsAlertOpen(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={30} className="text-center font-bold">
                    No subscription Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle> Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you absolutly sure you want to Delete this subscription?
                  this action cannot be un done.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-purple-500 text-white font-bold cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleSubscription()}
                  className="bg-purple-500 text-white font-bold cursor-pointer hover:bg-white hover:text-black"
                >
                  Continue
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
              <form onSubmit={handleSubmit(handleEdit)}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-right">
                      Price
                    </label>
                    <input
                      type="number"
                      {...register("price")}
                      id="name"
                      placeholder="Enter price here"
                      className="border rounded p-2 border-purple-600 w-full"
                    />
                    {errors.price && (
                      <p className="text-red-500">{errors.price.message}</p>
                    )}
                  </div>
                  <DialogFooter>
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-purple-500 text-white font-bold rounded px-2 py-1 cursor-pointer hover:bg-purple-500">
                        Save
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-purple-500 text-white font-bold cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleSubmit((data) => handleEdit(data))()
                            }
                            className="bg-purple-500 text-white font-bold cursor-pointer hover:bg-white hover:text-black"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DialogFooter>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminSubscription);
