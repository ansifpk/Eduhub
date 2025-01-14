import { Card, CardHeader } from "@/Components/ui/card";
import AdminAside from "../../Components/admin/AdminAside";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { FormEvent, HTMLAttributes, useEffect, useState } from "react";
import { ISubcription } from "@/@types/subscriptionType";
import { deleteSubscription, editSubscription, getSubscriptions } from "@/Api/admin";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import toast from "react-hot-toast";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
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
} from "@/Components/ui/alert-dialog";

const AdminSubscriptions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price,setPrice] = useState("")
  const [subscriptionId,setSubscriptionId] = useState("")
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getSubscriptions();
      if (response.success) {
        setSubscriptions(response.subscriptions);
      }
    };
    fetch();
  }, []);

  const handleSubscription = async (subscriptionId: string) => {
    const response = await deleteSubscription(subscriptionId);
    if (response.success) {
      const respo = await getSubscriptions();
      setSubscriptions(respo.subscriptions);
      return toast.success("successfully deleted.");
    } else {
      return toast.error(response.response.data.message);
    }
  };

  const handleEdit = async (e:FormEvent<HTMLFormElement>) => {
     e.preventDefault();

    const response = await editSubscription(subscriptionId,parseInt(price));
    if (response.success) {
      const respo = await getSubscriptions();
      setSubscriptions(respo.subscriptions);
      onClose()
      return toast.success("successfully edited.");
    } else {
      return toast.error(response.response.data.message);
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <AdminAside />
        <div className="col-md-10">
          <div className="welcome mt-4 mb-4 bg-purple-600">
            <h1>Welcome back, Admin</h1>
          </div>

          <div className="grid grid-cols-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <h2>Subscriptions</h2>

                  <Button onClick={() => navigate("/admin/addSubscription")}>
                    Add Subscription
                  </Button>
                </div>
              </CardHeader>
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
                          <Dialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <MoreHorizontal />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => {
                                  setPrice(value.price.toString())
                                  setSubscriptionId(value._id)
                                  onOpen()
                                  }}>
                                  Edit
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DialogTrigger asChild>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DialogTrigger>
                              </DropdownMenuContent>
                            </DropdownMenu>

                            <Modal
                              isOpen={isOpen}
                              size={"sm"}
                              onClose={onClose}
                            >
                              <ModalContent>
                                {(onClose) => (
                                  <>
                                    <ModalHeader className="flex flex-col gap-1">
                                      Edit Subcription
                                    </ModalHeader>
                                    <ModalBody>
                                      <form onSubmit={(e)=>handleEdit(e)}>
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="name"
                                              className="text-right"
                                            >
                                              Price
                                            </Label>
                                            <Input
                                              type="number"
                                              onChange={(e)=>setPrice(e.target.value)}
                                              id="name"
                                              value={price}
                                              className="col-span-3"
                                            />
                                          </div>
                                          <ModalFooter >
                                            <Button
                                              type="submit"
                                              className="bg-purple-500 hover:bg-purple-500"
                                              onClick={onClose}
                                            >
                                              Save
                                            </Button>
                                          </ModalFooter>
                                        </div>
                                      </form>
                                    </ModalBody>
                                  </>
                                )}
                              </ModalContent>
                            </Modal>

                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                  Are you absolutly sure you want to Delete this
                                  coupon? this action cannot be un done.
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
                                    onClick={() =>
                                      handleSubscription(value._id)
                                    }
                                    className="bg-black text-white"
                                  >
                                    Continue
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>

                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                  Are you absolutly sure you want to Delee this
                                  coupon? this action cannot be un done.
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
                                    onClick={() =>
                                      handleSubscription(value._id)
                                    }
                                    className="bg-black text-white"
                                  >
                                    Continue
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
