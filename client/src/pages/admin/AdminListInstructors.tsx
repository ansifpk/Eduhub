import AdminAside from '@/Components/admin/AdminAside'
import { Card } from '@/Components/ui/card';
import { useEffect, useState } from 'react';
import { instructors,blockInstructors} from '@/Api/admin';
import toast from 'react-hot-toast';
import { Table, TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from '@/Components/ui/table';


interface IUser{
  _id?:string;
  name:string;
  email:string;
  isBlock:boolean;
}

const AdminListInstructors = () => {
    const [instructor,setInstructors] = useState([])
    useEffect(()=>{
      const fetchAllinstructors = async () => {
          const response = await instructors();
          setInstructors(response); 
      }
      fetchAllinstructors()
    },[]);
    const handleBlockInstructroctor = async (userId:string) => 
      { 
      const response = await blockInstructors(userId)
      if(response.success){
        if(response.data.isBlock){
           const res = await instructors();
           setInstructors(res); 
           toast.success("Successfully UnBlock Instructroctor")
           return;
        }else{
          const res = await instructors();
          setInstructors(res); 
          return toast.success("Successfully BLock Instructroctor")
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
                   <h1 className="text-lg font-bold">Instructors</h1>
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
                    {instructor.length>0? (
                      instructor.map((value:IUser,index)=>(
                        <TableRow key={index}>
                          <TableCell className="font-medium"> <img src="https://via.placeholder.com/50" alt="Profile Picture" className="profile-pic" /></TableCell>
                          <TableCell>{value.name}</TableCell>
                          <TableCell>{value.email}</TableCell>
                          <TableCell className="text-right"><button onClick={()=>handleBlockInstructroctor(value._id!)} className={value.isBlock?'btn btn-danger':'btn btn-success'}>{value.isBlock ? "UnBlock":"BLock"}</button></TableCell>
                        </TableRow>
                      ))
                    ):(
                    <TableRow>
                      <TableCell className="font-medium">NO Instructroctors Found</TableCell>
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

export default AdminListInstructors
