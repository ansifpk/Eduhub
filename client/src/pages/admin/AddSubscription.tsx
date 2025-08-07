import { adminCreateSubscription } from "../../Api/admin";
import AdminAside from "../../components/admin/AdminAside";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
// import { Checkbox } from "@heroui/react";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddSubscription: React.FC = () => {
  const [plan, setPlan] = useState("Monthly");
  const [features] = useState([
    "Cancel at any time.",
    "Add test to your course.",
  ]);

  const [price, setPrice] = useState("0");

  const [errors, setErrors] = useState({
    price: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    if (parseInt(price) < 50 || parseInt(price) > 5000 || price.length == 0) {
      setErrors((prev) => ({
        ...prev,
        price: true,
      }));
      return;
    }
    const response = await adminCreateSubscription(
      parseInt(price),
      plan,
      features
    );

    if (response.success) {
      toast.success("Succesfully created");
      return navigate(-1);
    } else {
      return toast.error(response.response.data.message);
    }
  };

  return (
    <div className="flex gap-3">
      <AdminAside />
      <div className="w-full mr-3">
        <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="text-3xl">Welcome back, Admin</span>
        </div>
        <div className="flex w-full justify-center">
          <Card className="w-75 my-3">
            <CardHeader>
              <div>
                <h4 className="text-lg font-semibold">Add New Subscription</h4>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full gap-1.5">
                  <Label
                    className={errors.price ? "text-danger" : ""}
                    htmlFor="message-2"
                  >
                    Price
                  </Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setErrors((prev) => ({
                        ...prev,
                        price: false,
                      }));
                      setPrice(e.target.value);
                    }}
                    placeholder="Type your Price here."
                    id="message-2"
                  />
                  {errors.price ? (
                    <p className="text-sm text-muted-foreground text-danger">
                      Price must be in between 50 - 5000.
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      This Price will be display to the public.
                    </p>
                  )}
                </div>

                <div className="mb-3 space-y-2">
                  <Label>Select the type of plane</Label>
                  <RadioGroup
                    className="flex"
                    onValueChange={(value) => setPlan(value)}
                    defaultValue={plan}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Monthly" id="r1" />
                      <Label htmlFor="r1">Monthly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yearly" id="r2" />
                      <Label htmlFor="r2">Yearly</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid space-y-1 w-full gap-1.5">
                  <Label>Feutures</Label>
                  {features.map((val, index) => (
                    <div>
                      <Checkbox checked={true} key={index} color="success" />
                      {val}
                    </div>
                      
                    
                  ))}
                </div>
                <div className="flex justify-end gap-5">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-purple-500 hover:bg-purple-500"
                        type="button"
                      >
                        Create
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          Are you absolutly sure you want to create this
                          subscription? this action cannot be un done.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            className="bg-purple-500 hover:bg-purple-500"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-purple-500 hover:bg-purple-500"
                          >
                            Continue
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button type="button" className="bg-purple-600 hover:bg-purple-400" onClick={()=>navigate('/admin/subscriptions')}>Back</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddSubscription;
