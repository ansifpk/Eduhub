import AdminAside from "../../components/admin/AdminAside";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import toast from "react-hot-toast";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import useRequest from "../../hooks/useRequest";
import adminRoutes from "../../service/endPoints/adminEndPoints";

interface ICategory {
  _id?: string;
  title: string;
  description: string;
  topic?: string[];
}

const EditCategory: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [subCategory, setsubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const { doRequest,errors } = useRequest();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    doRequest({
      url:adminRoutes.category,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        const data = response.filter((value: ICategory) => value._id == id);
        const cate = data[0];
        setTitle(cate.title || title);
        setDiscription(cate.description || description);
        setTopics(cate.topics || topics);
      }
    });
  }, [id]);

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
    setTopics((prevTopics) => prevTopics.filter((_value, i) => i !== index));
    toast.success("sub Category removed");
  };
  const handleCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (topics.length == 0) {
      return toast.error("Atleast add one tpic for this category");
    }
     
    doRequest({
      url:adminRoutes.editCategory,
      body:{ _id: id, title, description, topics },
      method:"patch",
      onSuccess:()=>{
        toast.success(" Category edited");
        return navigate("/admin/category");
      }
    })
  };

  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message))
  },[errors]);

  return (
    <div className="flex gap-2">
      <AdminAside/>
      <div className="w-full">
      <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="text-3xl">Welcome back, Admin</span>
        </div>
         <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">Edit Category</h2>
                </div>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex justify-between">
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
                          <Button className="bg-purple-600 hover:bg-purple-500" type="button" onClick={handleSubCategory}>
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
                  <div className="flex justify-center gap-10">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-purple-600 hover:bg-purple-500" type="button">Back</Button>
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
                            className="bg-purple-600 hover:bg-purple-500"
                            type="button"
                            onClick={() => navigate(-1)}
                          >
                            Cancel
                          </AlertDialogAction>
                          <AlertDialogAction
                            className="bg-purple-600 hover:bg-purple-500"
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
                        <Button className="bg-purple-600 hover:bg-purple-500" type="button">Edit Category</Button>
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
                           className="bg-purple-600 hover:bg-purple-500"
                            type="button"
                          >
                            Cancel
                          </AlertDialogAction>
                          <AlertDialogAction
                            className="bg-purple-600 hover:bg-purple-500"
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
  );
};

export default EditCategory;
