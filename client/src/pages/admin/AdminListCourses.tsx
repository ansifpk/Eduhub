import AdminAside from '@/Components/admin/AdminAside'
import { Card, CardContent, CardDescription } from '@/Components/ui/card';
import { useEffect, useState } from 'react';
import { getCourses, students } from '@/Api/admin';
import toast from 'react-hot-toast';
import { Table, TableBody,
  
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { ICourse } from '@/@types/courseType';

const AdminListCourses = () => {
    const [courses,setStudents] = useState([])
    useEffect(()=>{
      const fetchAllStudents = async () => {
          const response = await getCourses();
          console.log(response,"///////////////////////////////");
          
          // setStudents(response); 
      }
      fetchAllStudents()
    },[]);
    const handleListeCourse = (id:string) => {
      console.log("hi",id);
      
    }
  return (
    <div className="container-fluid ">
    <div className="row">
        <AdminAside/>
        <div className="col-md-10">   
            <div className="welcome mt-4 mb-4 bg-purple-600">
                <h1>Welcome back, Admin</h1>
                <img src="https://via.placeholder.com/50" alt="Profile Picture" className="profile-pic" />
            </div>
            <div className="grid grid-cols-1">
            <div className='d-flex justify-content-between'>
                   <h1 className="text-lg font-bold">Courses</h1>
                   {/* <Button className='mb-3' onClick={()=>navigate("/admin/addCategory")} >Add Categories</Button> */}
                </div>
                <Card>
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] ">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.length>0? (
                      courses.map((value:ICourse,index)=>(
                        <TableRow key={index}>
                          <TableCell className="font-medium"> <img src={"https://github.com/shadcn.png"} alt="Profile Picture" className="profile-pic" /></TableCell>
                          <TableCell>{value.title}</TableCell>
                          <TableCell>{value.description}</TableCell>
                          <TableCell className="text-right">
                             
                          <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button
                                  type='button'
                                  className={
                                    value.isListed
                                      ? "btn btn-danger"
                                      : "btn btn-success"
                                  }
                                >
                                  {value.isListed ? "UnBlock" : "BLock"}
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will deney access of this user to enter Eduhub  
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-black text-white" type="button" >Cancel</AlertDialogCancel>
                                  <AlertDialogCancel className="bg-black text-white" type="button"  onClick={() =>
                                    handleListeCourse(value._id!)
                                  } >Continue</AlertDialogCancel>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>

                            {/* <button onClick={()=>handleBlockStudents(value._id!)} className={value.isBlock?'btn btn-danger':'btn btn-success'}>{value.isBlock ? "UnBlock":"BLock"}</button> */}
                          </TableCell>
                        </TableRow>
                      ))
                    ):(
                    <TableRow>
                      <TableCell align='center' colSpan={20} className="font-medium">No Courses Available</TableCell>
                    </TableRow>
                    )}
                  </TableBody>
                </Table>
             </Card>
          </div>
        </div>
    </div>
</div>
  )
}

export default AdminListCourses
