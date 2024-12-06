import AdminAside from '@/Components/admin/AdminAside'
import { Card,CardContent,CardHeader } from '@/Components/ui/card';
import { useEffect, useState } from 'react';
import { Button } from '@/Components/ui/button';
import { useNavigate } from 'react-router-dom';
import { students,blockUser } from '@/Api/admin';
import toast from 'react-hot-toast';
import { Table, TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from '@/Components/ui/table';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';


interface IUser{
  _id?:string;
  name:string;
  email:string;
  isBlock:boolean;
  avatar:{
    id:string,
    avatar_url:string
  }
}

const AdminListStudents = () => {
    const [student,setStudents] = useState([])
    useEffect(()=>{
      const fetchAllStudents = async () => {
          const response = await students();
          setStudents(response); 
      }
      fetchAllStudents()
    },[]);
    const handleBlockStudents = async (userId:string) => 
      { 
      const response = await blockUser(userId)
      if(response.success){
        if(response.data.isBlock){
          const res = await students();
          setStudents(res); 
           toast.success("Successfully Block User")
           return;
        }else{
          const res = await students();
          setStudents(res); 
          return toast.success("Successfully UnBLock User")
        }
        
      }else{
       return  toast.error(response.response.data.message)
      }
      
      
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
                   <h1 className="text-lg font-bold">Students</h1>
                 
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
                    {student.length>0? (
                      student.map((value:IUser,index)=>(
                        <TableRow key={index}>
                          <TableCell className="font-medium"> <img src={value.avatar.avatar_url?value.avatar.avatar_url:"https://github.com/shadcn.png"} alt="Profile Picture" className="profile-pic" /></TableCell>
                          <TableCell>{value.name}</TableCell>
                          <TableCell>{value.email}</TableCell>
                          <TableCell className="text-right">
                             
                          <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button
                                  type='button'
                                  className={
                                    value.isBlock
                                      ? "btn btn-danger"
                                      : "btn btn-success"
                                  }
                                >
                                  {value.isBlock ? "UnBlock" : "BLock"}
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
                                    handleBlockStudents(value._id!)
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
                      <TableCell align='center' colSpan={20} className="font-medium">No Students Found</TableCell>
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

export default AdminListStudents
