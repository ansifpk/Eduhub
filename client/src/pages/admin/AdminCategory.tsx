import AdminAside from "@/Components/admin/AdminAside";
import { Card } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/Components/ui/alert-dialog";
import { Badge } from "@/Components/ui/badge";
import useRequest from "@/hooks/useRequest";
import adminRoutes from "@/service/endPoints/adminEndPoints";

interface ICategory {
  _id?: string;
  title: string;
  isListed: boolean;
  description: string;
}

const AdminCategory = () => {
  const { doRequest,errors } = useRequest();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    doRequest({
      url:adminRoutes.category,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        setCategories(response);
      }
    })
  }, []);
  
  const handleListCategory = async (id: string) => {
    doRequest({
      url:`${adminRoutes.listCategory}/${id}`,
      method:"patch",
      body:{},
      onSuccess:(response)=>{
        doRequest({
          url:adminRoutes.category,
          method:"get",
          body:{},
          onSuccess:(respo)=>{
            setCategories(respo);
            if(response.data.isListed){
              toast.success("Successfully UnListed Category");
            }else{
              toast.success("Successfully Listed Category");
            }
          }
        })
      }
    });
  };

  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message))
  },[errors]);

  return (
    <div className="flex gap-2">
      <AdminAside />
      <div className="w-full mr-3">
        <div className="w-full mx-auto mt-2 rounded-lg p-2  text-white bg-purple-600">
          <h1>Welcome back, Admin</h1>
        </div>
        <div className="w-full">
          <div className="flex justify-between my-3 ">
            <h1 className="text-lg font-bold">Instructors</h1>
             <Button onClick={() => navigate("/admin/addCategory")}>
                Add Category
              </Button>
          </div>
          {/* table card  */}
          <Card>
            <Table>
              <TableHeader>
               <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Descriptoin</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
              {categories.length > 0 ? (
                    categories.map((value: ICategory, index) => (
                      <TableRow key={index}>
                        <TableCell>{value.title}</TableCell>
                        <TableCell>{value.description}</TableCell>
                        <TableCell>
                          {value.isListed ? (
                            <Badge className="bg-success ">Listed</Badge>
                          ) : (
                            <Badge className="bg-danger">Un Listed</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center space-x-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className={value.isListed ? "border-success" : "border-danger"} variant="outline" type="button">
                                {value.isListed ? "UnList" : "List"}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Do you wnat to{" "}
                                  {value.isListed ? "Un List" : "List"} this
                                  category ?
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
                                  type="button"
                                  className="bg-black text-white"
                                  onClick={() => handleListCategory(value._id!)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <Button
                            onClick={() =>
                              navigate(`/admin/editCategory/${value._id}`)
                            }
                            className=" border-primary"
                            variant="outline"
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={20}>
                        No instructors Available
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </Card>
          {/* table card end */}
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
