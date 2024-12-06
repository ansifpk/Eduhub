import AdminAside from "@/Components/admin/AdminAside";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import { category, listCategory } from "@/Api/admin";
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
  AlertDialogCancel,
  AlertDialogAction,
} from "@/Components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/Components/ui/badge";

interface ICategory {
  _id?: string;
  title: string;
  isListed: boolean;
  description: string;
}

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllCategories = async () => {
      const response = await category();
      setCategories(response);
    };
    fetchAllCategories();
  }, []);
  const handleListCategory = async (id: string) => {
    const response = await listCategory(id);

    if (response.success) {
      if (response.data.isListed) {
        const res = await category();
        setCategories(res);
        toast.success("Successfully UnListed Category");
        return;
      } else {
        const res = await category();
        setCategories(res);
        return toast.success("Successfully Listed Category");
      }
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
          <div className="grid grid-cols-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <h2>Category</h2>

                  <Button onClick={() => navigate("/admin/addCategory")}>
                    Add Category
                  </Button>
                </div>
              </CardHeader>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
