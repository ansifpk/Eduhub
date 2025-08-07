import { User } from "../../@types/userType";
import InstructorAside from "../../components/instructor/InstructorAside";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Separator } from "../../components/ui/separator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../../components/ui/checkbox";
import instructorRoutes from "../../service/endPoints/instructorEndPoints";
import useRequest from "../../hooks/useRequest";

const AddSubscription = () => {
  const [plan, setPlan] = useState("Monthly");
  const [features] = useState([
    "Cancel at any time.",
    "Access to all courses of this instructor.",
  ]);
  const { doRequest, errors } = useRequest();
  const [price, setPrice] = useState("0");
  const [error, setErrors] = useState({
    price: false,
  });
  const instructorId = useSelector((state: User) => state.id);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (parseInt(price) < 50 || parseInt(price) > 5000 || price.length == 0) {
      setErrors((prev) => ({
        ...prev,
        price: true,
      }));
      return;
    }

    doRequest({
      url: `${instructorRoutes.subscription}/${instructorId}`,
      method: "post",
      body: { price: parseInt(price), plan, description: features },
      onSuccess: () => {
        toast.success("Succesfully created");
        return navigate(-1);
      },
    });
  };

  useEffect(() => {
    errors?.map((err) => toast.error(err.message));
  }, [errors]);

  return (
    <div>
      <div className="bg-black ">
        <div className="hidden space-y-6 p-10 pb-16 md:block">
          <div className="flex items-center justify-between space-y-2">
            <div className="space-y-0.5">
              <h2 className="text-white text-2xl font-bold tracking-tight">
                Edu Hub
              </h2>
              <p className="text-muted-foreground">
                Manage your instructor account students and courses.
              </p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row  lg:space-y-0">
            <InstructorAside />
            <Separator orientation="vertical" />
            <Separator orientation="vertical" />
            <Separator orientation="vertical" />
            <Separator orientation="vertical" />
            <Separator orientation="vertical" />
            <Separator orientation="vertical" />
            <Separator orientation="vertical" />
            <Separator orientation="vertical" />
            <Separator orientation="vertical" />
            <div className="flex-1 lg:max-w-full md:max-w-full">
              <div className="flex w-full justify-center">
                <Card className="w-75 my-3 bg-black">
                  <CardHeader>
                    <div>
                      <h4 className="text-lg text-white font-semibold">
                        Add New Subscription
                      </h4>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid w-full gap-1.5">
                        <Label
                          className={
                            error.price ? "text-red-600" : "text-white"
                          }
                          htmlFor="message-2"
                        >
                          Price
                        </Label>
                        <Input
                          type="number"
                          value={price}
                          className="text-white"
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
                        {error.price ? (
                          <p className="text-sm text-red-500">
                            Price must be in between 50 - 5000.
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            This Price will be display to the public.
                          </p>
                        )}
                      </div>

                      <div className="mb-3 space-y-2 text-white">
                        <Label>Select the type of plane</Label>
                        <RadioGroup
                          className="flex "
                          onValueChange={(value) => setPlan(value)}
                          defaultValue={plan}
                        >
                          <div className="flex items-center text-white  space-x-2">
                            <RadioGroupItem
                              className="bg-white"
                              value="Monthly"
                              id="r1"
                            />
                            <Label htmlFor="r1">Monthly</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              className="bg-white"
                              value="Yearly"
                              id="r2"
                            />
                            <Label htmlFor="r2">Yearly</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid space-y-1 w-full gap-1.5 text-white">
                        <Label>Feutures</Label>
                        {features.map((val, index) => (
                          <div key={index}>
                            <Checkbox color="success" checked={true} />
                            <span className="text-white">{val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end gap-5">
                        <Button
                          className="bg-purple-500 hover:bg-purple-500"
                          type="button"
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </Button>
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
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
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
      </div>
    </div>
  );
};

export default AddSubscription;
