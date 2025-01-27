import { adminCreateSubscription } from "@/Api/admin";
import AdminAside from "@/Components/admin/AdminAside";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
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
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Checkbox } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddSubscription: React.FC = () => {
  const [plan, setPlan] = useState("Monthly");
  const [features] = useState([
    "Cancel at any time.",
    "Add test to your course.",
  ]);

  const [price, setPrice] = useState("0");
  const [status, setStatus] = useState("students");
  const [errors, setErrors] = useState({
    price: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {

    console.log(price, plan, features);

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
    console.log(response);
    if (response.success) {
      toast.success("Succesfully created");
      return navigate(-1);
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
            <img
              src="https://via.placeholder.com/50"
              alt="Profile Picture"
              className="profile-pic"
            />
          </div>
          <div className="flex w-full justify-center">
            <Card className="w-50 my-3">
              <CardHeader>
                <div>
                  <h4 className="text-lg font-semibold">
                    Add New Subscription
                  </h4>
                </div>
              </CardHeader>
              <CardContent>
                <form >
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
                      <Checkbox
                        key={index}
                        size="sm"
                        radius="full"
                        color="success"
                        defaultSelected
                        isDisabled
                      >
                        {val}
                      </Checkbox>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-purple-500 hover:bg-purple-500" type="button">Create</Button>
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

export default AddSubscription;
