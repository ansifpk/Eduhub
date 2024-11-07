import AdminAside from '@/Components/admin/AdminAside'
import { Card,CardContent,CardHeader } from '@/Components/ui/card';
import { useEffect, useState } from 'react';
import { Button } from '@/Components/ui/button';
import { useNavigate } from 'react-router-dom';
import { students,blockStudents } from '@/Api/admin';
import toast from 'react-hot-toast';
import { Table, TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from '@/Components/ui/table';
import { blockUser } from '@/redux/authSlice';

interface IUser{
  _id?:string;
  name:string;
  email:string;
  isBlock:boolean;
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
      const response = await blockStudents(userId)
      if(response.success){
        if(response.data.isBlock){
          const res = await students();
          setStudents(res); 
           toast.success("Successfully UnBlock User")
           return;
        }else{
          const res = await students();
          setStudents(res); 
          return toast.success("Successfully BLock User")
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
                    {student.length>0? (
                      student.map((value:IUser,index)=>(
                        <TableRow key={index}>
                          <TableCell className="font-medium"> <img src="https://via.placeholder.com/50" alt="Profile Picture" className="profile-pic" /></TableCell>
                          <TableCell>{value.name}</TableCell>
                          <TableCell>{value.email}</TableCell>
                          <TableCell className="text-right"><button onClick={()=>handleBlockStudents(value._id!)} className={value.isBlock?'btn btn-danger':'btn btn-success'}>{value.isBlock ? "UnBlock":"BLock"}</button></TableCell>
                        </TableRow>
                      ))
                    ):(
                    <TableRow>
                      <TableCell className="font-medium">NO Sudnets Found</TableCell>
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
