import AdminAside from "@/Components/admin/AdminAside";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import toast from "react-hot-toast";

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
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import useRequest from "@/hooks/useRequest";
import adminRoutes from "@/service/endPoints/adminEndPoints";

const AdminCategory: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [subCategory, setsubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const { doRequest, errors } = useRequest();

  const navigate = useNavigate();
  const handleSubCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (topics.length < 8) {
      if (topics.includes(subCategory)) {
        return toast.error("sub Category already exists");
      } else {
        setTopics((prevState) => [...prevState, subCategory]);
        setsubCategory("");
        toast.success("sub Category added");
      }
    } else {
      setsubCategory("");
      toast.error("maximum limite exceeded");
    }
  };
  const handleCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (topics.length == 0) {
      return toast.error("Add atleast one topic for your category");
    }
    doRequest({
      url: adminRoutes.addCategory,
      method: "post",
      body: { title, description, topics },
      onSuccess: () => {
        toast.success(" Category added");
        return navigate("/admin/category");
      },
    });
  };

  const deleteTopic = async (index: number) => {
    try {
      setTopics((prev) => {
        let arr = [...prev];
        arr.splice(index, 1);
        return arr;
      });

      return toast.success("topic removed");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    errors?.map((err) => toast.error(err.message));
  }, [errors]);

  return (
    <div className="flex gap-2">
      <AdminAside />
      <div className="w-full">
        <div className="welcome mt-4 mb-4 bg-purple-600">
          <h1>Welcome back, Admin</h1>
        </div>
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-between">
              <h2 className="text-lg font-semibold">Add New Category</h2>
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
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input
                        type="text"
                        value={subCategory}
                        onChange={(e) => setsubCategory(e.target.value.trim())}
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
                          topics.map((tagss, ind) => (
                            <div key={tagss}>
                              <div className="text-sm flex d-flex justify-between">
                                <div>{tagss}</div>
                                <button
                                  type="button"
                                  onClick={() => deleteTopic(ind)}
                                  className="bg-danger text-white px-2 rounded"
                                >
                                  X
                                </button>
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
                    <Button>Back</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You cannot retrieve the informations you entered now.
                        All will remove permenently
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
                    <Button type="button">Add Category</Button>
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
                        type="button"
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
  );
};

export default AdminCategory;
