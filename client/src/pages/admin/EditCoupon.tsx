import AdminAside from "@/Components/admin/AdminAside";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import toast from "react-hot-toast";
import {  editCategory } from "@/Api/admin";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
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

interface ICategory {
  _id?: string;
  title: string;
  description: string;
  topic?: string[];
}

const EditCoupon: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [subCategory, setsubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  // const [Category,setCategory] = useState<ICategory | undefined>()

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    // const fetchAllCategories = async () => {
    //   const response = await category();
    //   if (response) {
    //     const data = response.filter((value: ICategory) => value._id == id);
    //     const cate = data[0];
    //     setTitle(cate.title || title);
    //     setDiscription(cate.description || description);
    //     setTopics(cate.topics || topics);
    //   } else {
    //     return toast.error("Category Not Fount");
    //   }
    // };
    // fetchAllCategories();
  }, []);
  //   console.log("idh",Category)
  const handleSubCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (subCategory.length == 0) {
      return;
    }
    if (topics.length < 8) {
      setTopics((prevState) => [...prevState, subCategory]);
      setsubCategory("");
      toast.success("sub Category added");
    } else {
      setsubCategory("");
      toast.error("maximum limite exceeded");
    }
  };
  const deleteTopic = async (index: number) => {
    setTopics((prevTopics) => prevTopics.filter((value, i) => i !== index));
    toast.success("sub Category removed");
  };
  const handleCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (topics.length == 0) {
      return toast.error("Atleast add one tpic for this category");
    }
    console.log("creatig");
    
    const respose = await editCategory({ _id: id, title, description, topics });
    console.log("edit cat", respose);
    if (respose.success) {
      toast.success(" Category edited");
      return navigate("/admin/category");
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
                  <h2 className="text-lg font-semibold">Edit Category</h2>
                </div>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="d-flex justify-content-between">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="Title">Title</Label>
                      <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="Title"
                        placeholder="Title"
                      />

                      <Label htmlFor="Deacription">Deacription</Label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDiscription(e.target.value)}
                        maxLength={100}
                        placeholder="Add your Deacription here."
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <div>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                          <Input
                            type="text"
                            value={subCategory}
                            onChange={(e) =>
                              setsubCategory(e.target.value.trim())
                            }
                            placeholder="Sub Categories"
                          />
                          <Button type="button" onClick={handleSubCategory}>
                            Add
                          </Button>
                        </div>
                        <ScrollArea className="h-60 w-48 rounded-md border">
                          <div className="p-4">
                            <h4 className="mb-4 text-sm font-medium leading-none">
                              Topics
                            </h4>
                            {topics.length > 0 ? (
                              topics.map((topic, ind) => (
                                <div key={ind}>
                                  <div className="text-sm flex d-flex justify-between">
                                    <div>{topic}</div>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <button
                                          type="button"
                                          className="bg-danger text-white px-2 rounded"
                                        >
                                          X
                                        </button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Are you absolutely sure?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to delete this
                                            topic from this category?
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
                                            onClick={() => deleteTopic(ind)}
                                          >
                                            Continue
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                
                                  </div>
                                  <Separator className="my-2" />
                                </div>
                              ))
                            ) : (
                              <div className="text-sm text-center">
                                no topics added
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-10">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button type="button">Back</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Do you want to save the changes for this category?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction
                            className="bg-black text-white"
                            type="button"
                            onClick={() => navigate(-1)}
                          >
                            Cancel
                          </AlertDialogAction>
                          <AlertDialogAction
                            className="bg-black text-white"
                            type="button"
                            onClick={handleCategory}
                          >
                            Save Changes
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button type="button">Edit Category</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you wnat to save this changes for this
                            category?
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
                            onClick={handleCategory}
                          >
                            Edit Category
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

export default EditCoupon;
