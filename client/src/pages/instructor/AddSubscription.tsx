import { User } from '@/@types/userType';
import { createSubscription } from '@/Api/instructor';
import InstructorAside from '@/Components/instructor/InstructorAside';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { DialogHeader, DialogFooter,Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Separator } from '@/Components/ui/separator';
import { Checkbox } from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AddSubscription = () => {
    
    const [plan, setPlan] = useState("Monthly");
    const [features] = useState([
      "Cancel at any time.",
      "Access to all courses of this instructor.",
    ]);
  
    const [price, setPrice] = useState("0");
    const [errors, setErrors] = useState({
      price: false,
    });
    const instructorId = useSelector((state:User)=>state.id);
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
      const response = await createSubscription(
        instructorId,
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
        <div>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row  lg:space-y-0">
            <InstructorAside  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
        <div className="flex-1 lg:max-w-full md:max-w-full">
             <div className="flex w-full justify-center">
            <Card className="w-50 my-3 bg-black">
              <CardHeader>
                <div>
                  <h4 className="text-lg text-white font-semibold">
                    Add New Subscription
                  </h4>
                </div>
              </CardHeader>
              <CardContent>
                <form >
                  <div className="grid w-full gap-1.5">
                    <Label
                      className={errors.price ? "text-danger" : "text-white"}
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

                  <div className="mb-3 space-y-2 text-white">
                    <Label>Select the type of plane</Label>
                    <RadioGroup
                    
                      className="flex "
                      onValueChange={(value) => setPlan(value)}
                      defaultValue={plan}
                    >
                      <div className="flex items-center text-white  space-x-2">
                        <RadioGroupItem value="Monthly" id="r1" />
                        <Label htmlFor="r1">Monthly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yearly" id="r2" />
                        <Label htmlFor="r2">Yearly</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid space-y-1 w-full gap-1.5 text-white">
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
                        <span className='text-white'>{val}</span>
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
  </div>
    </div>
  )
}

export default AddSubscription
